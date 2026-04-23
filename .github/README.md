<!-- markdownlint-disable MD041 -->
<div align="center">
  <a href="https://github.com/z-shell/zi">
    <img src="https://raw.githubusercontent.com/z-shell/zi/main/docs/images/logo.svg" width="80" height="80" alt="Z-Shell Logo" />
  </a>
  <h2>❮ Z-Shell Wiki ❯</h2>
  <p><strong>A Swiss Army Knife for Zsh Unix shell</strong></p>

  <p>
    <a href="https://translate.zshell.dev/"><img src="https://badges.crowdin.net/e/f108c12713ee8526ac878d5671ad6e29/localized.svg" alt="Crowdin" /></a>
    <a href="https://wiki.zshell.dev"><img src="https://img.shields.io/website?url=https%3A%2F%2Fwiki.zshell.dev&label=wiki.zshell.dev" alt="Website" /></a>
    <a href="https://github.com/z-shell/wiki/blob/main/LICENSE"><img src="https://img.shields.io/github/license/z-shell/wiki" alt="License" /></a>
    <a href="https://github.com/z-shell/zi/stargazers"><img src="https://img.shields.io/github/stars/z-shell/zi?style=social" alt="Zi Stars" /></a>
  </p>
</div>

---

This repository contains the source code for the **[Z-Shell Wiki](https://wiki.zshell.dev)**, the official knowledge base and documentation for **[Zi](https://github.com/z-shell/zi)** and the Z-Shell ecosystem.

Built with **[Docusaurus](https://docusaurus.io/)**, it provides a modern, fast, and searchable interface for Zsh users, developers, and maintainers.

## 🚀 Quick Links

- **[Live Wiki](https://wiki.zshell.dev)**: Read the documentation online.
- **[Zi Plugin Manager](https://github.com/z-shell/zi)**: The core project.
- **[Community Discussions](https://github.com/z-shell/zi/discussions)**: Ask questions and share ideas.
- **[Localization (Crowdin)](https://translate.zshell.dev/)**: Help us translate the wiki into your language.

## 🛠️ Local Development

To run the wiki locally for testing or contribution:

### Prerequisites

- **[Node.js](https://nodejs.org/)** (>= 20.x)
- **[pnpm](https://pnpm.io/)** (>= 10.x)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/z-shell/wiki.git
   cd wiki
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm start
   ```

The site will be available at `http://localhost:3000`.

## 📂 Project Structure

- `docs/`: Core documentation and getting started guides.
- `community/`: Community-driven guides and resources.
- `ecosystem/`: Documentation for Zi annexes and related plugins.
- `blog/`: Project updates and articles.
- `src/`: Custom React components and styles.
- `static/`: Static assets (images, fonts, etc.).
- `i18n/`: Localized content (managed via Crowdin).

## ✍️ Contributing

We welcome contributions! Whether it's fixing a typo, updating outdated information, or adding a new guide.

- **Content Authoring**: Refer to [Docs Authoring Guidelines](https://github.com/z-shell/wiki/blob/main/.github/instructions/docs-authoring.instructions.md) for standards on MDX, frontmatter, and file naming.
- **Localization**: Use [Crowdin](https://translate.zshell.dev/) for translations. Do not modify files in `i18n/` directly.
- **Code of Conduct**: Please follow our [Code of Conduct](https://github.com/z-shell/.github/tree/main/.github/CODE_OF_CONDUCT.md).

## 🛡️ Security

Z-Shell follows good security practices. If you discover a security vulnerability, please refer to our [Security Policy](https://github.com/z-shell/.github/security).

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Developed with ❤️ by the <a href="https://github.com/z-shell">Z-Shell Community</a>.</p>
</div>
