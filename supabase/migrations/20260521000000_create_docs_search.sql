create schema if not exists docs_search;

create extension if not exists vector with schema extensions;
create extension if not exists pgcrypto with schema extensions;

create table docs_search.sources (
  id bigint generated always as identity primary key,
  source_key text not null unique,
  repo text not null,
  path text not null,
  url text not null,
  title text not null,
  visibility text not null check (visibility in ('public', 'maintainer')),
  content_hash text not null,
  indexed_at timestamptz not null default now()
);

create table docs_search.chunks (
  id bigint generated always as identity primary key,
  source_id bigint not null references docs_search.sources(id) on delete cascade,
  chunk_index integer not null,
  heading text not null,
  content text not null,
  token_estimate integer not null,
  embedding extensions.vector(1536) not null,
  unique (source_id, chunk_index)
);

create table docs_search.ingestion_runs (
  id bigint generated always as identity primary key,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null check (status in ('running', 'succeeded', 'failed')),
  source_count integer not null default 0,
  chunk_count integer not null default 0,
  error text
);

create index docs_search_sources_path_idx on docs_search.sources (repo, path);
create index docs_search_sources_hash_idx on docs_search.sources (content_hash);
create index docs_search_chunks_source_idx on docs_search.chunks (source_id, chunk_index);
create index docs_search_chunks_embedding_idx
  on docs_search.chunks using hnsw (embedding extensions.vector_cosine_ops);

create or replace function public.match_public_docs(
  query_embedding extensions.vector(1536),
  match_count integer default 8,
  match_threshold double precision default 0.72
)
returns table (
  source_key text,
  repo text,
  path text,
  url text,
  title text,
  heading text,
  content text,
  similarity double precision
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    s.source_key,
    s.repo,
    s.path,
    s.url,
    s.title,
    c.heading,
    c.content,
    1 - (c.embedding <=> query_embedding) as similarity
  from docs_search.chunks c
  join docs_search.sources s on s.id = c.source_id
  where s.visibility = 'public'
    and 1 - (c.embedding <=> query_embedding) >= match_threshold
  order by c.embedding <=> query_embedding
  limit least(greatest(match_count, 1), 20);
$$;

revoke all on schema docs_search from public, anon, authenticated;
revoke all on all tables in schema docs_search from public, anon, authenticated;
revoke all on function public.match_public_docs(extensions.vector, integer, double precision) from public;
grant execute on function public.match_public_docs(extensions.vector, integer, double precision) to anon, authenticated;
