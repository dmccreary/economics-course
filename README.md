# Introduction to Economics

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/economics-course/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Feconomics--course-blue?logo=github)](https://github.com/dmccreary/economics-course)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/economics-course/](https://dmccreary.github.io/economics-course/)

## Overview

This is an interactive, AI-generated intelligent textbook on **Introduction to Economics** designed for high school students. Built using MkDocs with the Material theme, it incorporates learning graphs, concept dependencies, interactive MicroSims (simulations), and AI-assisted content generation.

The textbook covers microeconomics, macroeconomics, personal finance, and the digital economy through hands-on simulations and interactive learning. It follows Bloom's Taxonomy (2001 revision) for learning outcomes and uses concept dependency graphs to ensure proper prerequisite sequencing.

Whether you're a student learning economics for the first time or an educator looking for structured course materials, this textbook provides comprehensive coverage with interactive elements that make complex concepts accessible and engaging.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 206 |
| Chapters | 14 |
| Markdown Files | 27 |
| MicroSims | 1 |
| Taxonomy Categories | 13 |

**Completion Status:** Chapter structure complete; content generation in progress.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/economics-course.git
cd economics-course
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
```

### Build and Serve Locally

Build the site:

```bash
mkdocs build
```

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch.

### Using the Book

**Navigation:**

- Use the left sidebar to browse chapters
- Click on the search icon to search all content
- Each chapter includes concept lists and learning objectives

**Interactive Features:**

- **Learning Graph Viewer** - Explore concept dependencies visually
- **MicroSims** - Interactive simulations (found in the Sims section)

**Customization:**

- Edit markdown files in `docs/` to modify content
- Modify `mkdocs.yml` to change site structure
- Add your own MicroSims in `docs/sims/`

## Repository Structure

```
economics-course/
├── docs/                          # MkDocs documentation source
│   ├── chapters/                  # 14 chapter directories
│   │   ├── 01-what-is-economics/
│   │   ├── 02-demand-consumer-behavior/
│   │   ├── ...
│   │   └── 14-digital-economy-capstone/
│   ├── sims/                      # Interactive MicroSims
│   │   └── graph-viewer/          # Learning graph visualization
│   ├── learning-graph/            # Learning graph data and analysis
│   │   ├── learning-graph.json    # 206 concepts in vis-network format
│   │   ├── concept-list.md        # Full concept enumeration
│   │   ├── concept-taxonomy.md    # 13 category taxonomy
│   │   └── quality-metrics.md     # Graph quality analysis
│   ├── course-description.md      # Course overview and objectives
│   ├── index.md                   # Home page
│   └── license.md                 # CC BY-NC-SA 4.0 license
├── logs/                          # Session logs from AI generation
├── mkdocs.yml                     # MkDocs configuration
└── README.md                      # This file
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/economics-course/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [docs/license.md](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme
- **[vis-network](https://visjs.org/)** - Network visualization library for learning graphs
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the educators and economists whose work informs this textbook.

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.
