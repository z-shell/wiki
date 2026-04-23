/**
 * Docusaurus dev-server plugin: transparent R2 asset fallback.
 *
 * When running locally (`pnpm start`), files that have been offloaded to R2
 * (removed from the repo by the r2-sync workflow) are no longer present in
 * `static/`. This plugin registers an Express middleware that:
 *
 *   1. Checks whether the requested path exists in `static/`.
 *   2. If it does — calls `next()` so webpack/rspack serves it normally.
 *   3. If it doesn't — proxies the request to `ASSET_ORIGIN` (defaults to
 *      the live production site) and streams the response back to the browser.
 *
 * Only activates in development (`NODE_ENV !== "production"`).
 * Only intercepts requests under `/cdn/` and `/img/` — no open-proxy risk.
 */

import fs from "fs";
import path from "path";
import {Readable} from "node:stream";
import {pipeline} from "node:stream/promises";
import type {IncomingHttpHeaders, IncomingMessage, ServerResponse} from "node:http";
import type {LoadContext, Plugin} from "@docusaurus/types";

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (open: string) => (s: string) => (useColor ? `\x1b[${open}m${s}\x1b[0m` : s);
// Mirrors @docusaurus/logger: cyan.bold for tags, cyan.underline for urls, blue.bold for names
const ansi = {
  tag: c("36;1"),
  url: c("36;4"),
  name: c("34;1"),
};

const PROXIED_PREFIXES = ["/cdn/", "/img/"];
const REQUEST_HEADERS_TO_FORWARD = ["if-none-match", "range"] as const;
const RESPONSE_HEADERS_TO_FORWARD = [
  "accept-ranges",
  "access-control-allow-origin",
  "cache-control",
  "content-length",
  "content-range",
  "content-type",
  "etag",
  "last-modified",
] as const;

type NextFunction = (error?: unknown) => void;
type DevProxyRequest = IncomingMessage & {
  headers: IncomingHttpHeaders;
  method?: string;
  url?: string;
};
type DevProxyResponse = ServerResponse<IncomingMessage>;
type DevProxyMiddleware = (req: DevProxyRequest, res: DevProxyResponse, next: NextFunction) => void | Promise<void>;
type DevServerMiddleware =
  | DevProxyMiddleware
  | {
      name?: string;
      middleware: DevProxyMiddleware;
    };
type DevServerConfig = {
  setupMiddlewares?: (middlewares: DevServerMiddleware[]) => DevServerMiddleware[];
};

function getHeaderValue(header: string | string[] | undefined): string | undefined {
  return Array.isArray(header) ? header.join(", ") : header;
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export default function devAssetProxy(context: LoadContext) {
  const configureWebpack: NonNullable<Plugin["configureWebpack"]> = (_config, isServer) => {
    if (process.env.NODE_ENV === "production" || isServer) {
      return undefined;
    }

    const origin = (process.env.ASSET_ORIGIN ?? "https://wiki.zshell.dev").replace(/\/$/, "");
    const staticDir = path.join(context.siteDir, "static");
    const devServer: DevServerConfig = {
      setupMiddlewares: (middlewares: DevServerMiddleware[]) => {
        middlewares.unshift({
          name: "dev-asset-proxy",
          middleware: async (req: DevProxyRequest, res: DevProxyResponse, next: NextFunction) => {
            const requestUrl = new URL(req.url ?? "/", "http://localhost");
            const {pathname, search} = requestUrl;

            if (!PROXIED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
              next();
              return;
            }

            if (req.method !== "GET" && req.method !== "HEAD") {
              next();
              return;
            }

            const localPath = path.normalize(path.join(staticDir, pathname));
            if (!localPath.startsWith(`${staticDir}${path.sep}`)) {
              next();
              return;
            }

            if (fs.existsSync(localPath) && fs.statSync(localPath).isFile()) {
              next();
              return;
            }

            const acceptHeader = getHeaderValue(req.headers.accept);
            const upstream = `${origin}${pathname}${search}`;

            try {
              const upstreamHeaders: Record<string, string> = {
                "user-agent": "docusaurus-dev-asset-proxy/1.0",
                accept: acceptHeader ?? "*/*",
                "accept-encoding": "identity",
              };

              for (const headerName of REQUEST_HEADERS_TO_FORWARD) {
                const headerValue = getHeaderValue(req.headers[headerName]);
                if (headerValue) {
                  upstreamHeaders[headerName] = headerValue;
                }
              }

              const upstreamRes = await fetch(upstream, {
                method: req.method,
                headers: upstreamHeaders,
                signal: AbortSignal.timeout(10_000),
              });

              if (!upstreamRes.ok) {
                res.statusCode = upstreamRes.status;
                res.end();
                return;
              }

              res.statusCode = upstreamRes.status;
              for (const headerName of RESPONSE_HEADERS_TO_FORWARD) {
                const headerValue = upstreamRes.headers.get(headerName);
                if (headerValue) {
                  res.setHeader(headerName, headerValue);
                }
              }
              res.setHeader("x-asset-proxy", "1");

              if (req.method === "HEAD") {
                res.end();
                return;
              }

              if (!upstreamRes.body) {
                res.end();
                return;
              }

              await pipeline(Readable.fromWeb(upstreamRes.body as import("node:stream/web").ReadableStream), res);
            } catch (error: unknown) {
              console.warn(`${ansi.tag("[PROXY]")} Failed to proxy ${ansi.url(upstream)}: ${formatError(error)}`);
              next();
            }
          },
        });

        console.info(`${ansi.tag("[PROXY]")} Missing /cdn/ and /img/ assets will be proxied from ${ansi.url(origin)}`);
        console.info(`${ansi.tag("[PROXY]")} Override with ${ansi.name("ASSET_ORIGIN")}=<url> environment variable`);

        return middlewares;
      },
    };

    return {devServer} as ReturnType<NonNullable<Plugin["configureWebpack"]>>;
  };

  return {
    name: "dev-asset-proxy",
    configureWebpack,
  } satisfies Plugin;
}
