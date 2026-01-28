# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Intelligent Interactive Textbook** for Introduction to Economics, built with MkDocs Material. Target audience is high school students (Grade 11+, post-Algebra 1). The project uses a learning graph approach with 206 concepts across 14 chapters.

**Published Site:** https://dmccreary.github.io/economics-course/

## Common Commands

```bash
# Install dependencies
pip install mkdocs mkdocs-material

# Build site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

**Important:** Do NOT start or kill `mkdocs serve` processes. The user runs it in their own terminal to watch watchdog file change rebuilds.

## Architecture

### Directory Structure
- `docs/` - MkDocs documentation source (primary content)
  - `chapters/` - 14 numbered chapter directories (01-14)
  - `sims/` - Interactive MicroSims (p5.js, Chart.js, vis-network)
  - `learning-graph/` - Learning graph data (JSON/CSV) and analysis scripts
  - `prompts/` - AI generation prompt templates
- `src/images/` - Image generation scripts
- `logs/` - AI generation session logs and decisions

### Learning Graph
- `docs/learning-graph/learning-graph.json` - vis-network format with 206 nodes, 381 edges
- 13 taxonomy categories (FOUND, MICRO, MKSTR, MKFAIL, MACRO, EMPL, MONEY, POLICY, INTL, PERSONAL, DIGITAL, SYSTEMS, CRITICAL)
- DAG structure with longest dependency chain of 20 concepts

### Chapter Structure
Each chapter `index.md` contains:
- YAML front matter (title, description, reading_level, generated_by, date, version)
- Summary and concepts covered
- Main content with MicroSim iframe embeds
- Practice questions and critical thinking challenges
- Key takeaways

## Critical Conventions

### MkDocs Configuration
Never add `navigation.tabs` to mkdocs.yml - this project deliberately excludes top navigation tabs.

### MicroSims
- Local test URL format: `http://127.0.0.1:8000/economics-course/sims/[sim-name]/main.html`
- Always call `updateCanvasSize();` as the first step in p5.js `setup()` to get container width
- vis-network has a rendering bug with edge labels on horizontal edges - apply slight y-offset (e.g., 480 to 490)

### Content Style
- Light, humorous tone with positive attitude
- "Economic superpower" framing throughout
- Grade 11 reading level
- Critical thinking emphasis - detect misinformation
- MicroSim specifications in `<details>` tags within chapters

## AI Skills Used

This project uses Claude AI skills:
- `chapter-content-generator` - Generates chapter content from structure
- `learning-graph-generator` - Creates learning graphs from course descriptions
- `book-chapter-generator` - Generates chapter structure and outline
