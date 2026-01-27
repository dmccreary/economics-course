# Step 1: MkDocs Template Creation

**Date:** 2026-01-27
**Skill Used:** `/book-installer`

## Input Prompt

```
/book-installer create a mkdocs.yml template for me
```

## User Selections

When prompted for configuration details:

- **Book Title:** Introduction to Economics
- **Repository Name:** economics-course

## Design Decisions

### 1. Minimal Template Approach

Selected the minimal template (`mkdocs-minimal.yml`) rather than the full project setup because:

- Faster to get started
- Easier to understand for new users
- Features can be added incrementally using `/book-installer help`
- Avoids complexity of social cards plugin and conda environment setup

### 2. Theme Configuration

```yaml
theme:
  name: material
  palette:
    - scheme: default
      primary: indigo
      accent: indigo
```

**Rationale:**
- Material theme is the standard for intelligent textbooks
- Indigo is a professional, readable color scheme
- Default light scheme for accessibility
- No `navigation.tabs` - these books use side navigation optimized for wide landscape screens

### 3. Navigation Features

```yaml
features:
  - navigation.instant        # SPA-like navigation
  - navigation.instant.progress  # Loading progress bar
  - navigation.tracking       # URL updates as you scroll
  - content.code.copy         # Copy button on code blocks
```

**Rationale:**
- `navigation.instant` provides smooth, fast page transitions
- `navigation.tracking` helps with bookmarking and sharing specific sections
- `content.code.copy` is essential for any technical content

### 4. Markdown Extensions

```yaml
markdown_extensions:
  - admonition              # Note/warning/tip boxes
  - pymdownx.details        # Collapsible sections
  - pymdownx.superfences    # Enhanced code blocks
  - attr_list               # Add classes/IDs to elements
  - md_in_html              # Markdown inside HTML
  - toc:
      permalink: true       # Anchor links on headings
```

**Rationale:**
- These are the essential extensions for educational content
- Admonitions are critical for callouts and important information
- Superfences enables advanced code block features
- Permalinks allow direct linking to sections

### 5. Directory Structure

```
docs/
├── index.md                 # Home page
├── about.md                 # Book introduction and usage
├── course-description.md    # Used for learning graph generation
├── contact.md               # Author contact
├── license.md               # CC-BY-4.0
├── css/                     # Custom styles (future)
├── img/                     # Logo, favicon, images (future)
└── chapters/
    ├── 01-introduction/
    ├── 02-getting-started/
    └── 03-core-concepts/
```

**Rationale:**
- Two-digit chapter numbering (01, 02, etc.) ensures correct sort order
- Each chapter in its own directory allows for related assets (images, quizzes)
- `course-description.md` is the input file for learning graph generation
- Separate `css/` and `img/` directories follow MkDocs conventions

### 6. Content Decisions

- **License:** CC-BY-4.0 selected as the default for open educational resources
- **Contact email:** Used email from user's CLAUDE.md configuration
- **Starter chapter content:** Included basic economics concepts to demonstrate structure

## Files Created

| File | Purpose |
|------|---------|
| `mkdocs.yml` | Main MkDocs configuration |
| `docs/index.md` | Home page |
| `docs/about.md` | Book introduction |
| `docs/course-description.md` | Course overview for learning graph |
| `docs/contact.md` | Author contact information |
| `docs/license.md` | CC-BY-4.0 license |
| `docs/chapters/01-introduction/index.md` | Chapter 1 content |
| `docs/chapters/02-getting-started/index.md` | Chapter 2 content |
| `docs/chapters/03-core-concepts/index.md` | Chapter 3 content |

## What Was NOT Included (Can Be Added Later)

These features were intentionally omitted to keep the template minimal:

1. **Math equations** - Add with `/book-installer 5`
2. **Mermaid diagrams** - Add with `/book-installer 8`
3. **Image zoom (GLightbox)** - Add with `/book-installer 10`
4. **Interactive quizzes** - Add with `/book-installer 12`
5. **Logo and favicon** - Add with `/book-installer 2` and `/book-installer 3`
6. **Social media cards** - Requires additional plugins and setup
7. **Custom CSS branding** - Can be added to `docs/css/extra.css`

## Next Steps

1. Install MkDocs: `pip install mkdocs mkdocs-material`
2. Preview: `mkdocs serve`
3. Add features incrementally with `/book-installer help`
4. Create learning graph with `/learning-graph-generator`
5. Generate chapter content with `/chapter-content-generator`
