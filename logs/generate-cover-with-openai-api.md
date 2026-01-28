# Generate Cover Image with OpenAI API

**Date:** 2026-01-27
**Purpose:** Create a social preview cover image for the economics course using OpenAI's image generation API

## Overview

This session involved setting up and debugging the `generate-cover-openai.py` script to generate a cover image from the course description.

## Steps

### 1. Install Dependencies

```bash
pip install openai
pip install Pillow
```

### 2. Create Shell Script

Created `src/images/generate-cover.sh` to automate the cover generation process with resource verification:

```bash
#!/bin/bash
# Generate book cover image using OpenAI API
# Uses the course description to generate an appropriate cover

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

COURSE_DESC="$PROJECT_ROOT/docs/course-description.md"
PYTHON_SCRIPT="$SCRIPT_DIR/generate-cover-openai.py"
OUTPUT_DIR="$PROJECT_ROOT/docs/img"

echo "=== Cover Image Generator ==="
echo ""

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ ERROR: OPENAI_API_KEY environment variable is not set"
    echo "   Set it with: export OPENAI_API_KEY='your-key-here'"
    exit 1
else
    echo "✓ OPENAI_API_KEY is set"
fi

# Check for Python script
if [ -f "$PYTHON_SCRIPT" ]; then
    echo "✓ Python script found: $PYTHON_SCRIPT"
else
    echo "❌ ERROR: Python script not found: $PYTHON_SCRIPT"
    exit 1
fi

# Check for course description
if [ -f "$COURSE_DESC" ]; then
    echo "✓ Course description found: $COURSE_DESC"
else
    echo "❌ ERROR: Course description not found: $COURSE_DESC"
    exit 1
fi

# Check/create output directory
if [ -d "$OUTPUT_DIR" ]; then
    echo "✓ Output directory exists: $OUTPUT_DIR"
else
    echo "→ Creating output directory: $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
fi

echo ""
echo "Generating cover image..."
echo ""

python "$PYTHON_SCRIPT" \
    --desc "$COURSE_DESC" \
    --title "Introduction to Economics" \
    --out "$OUTPUT_DIR/cover.png" \
    "$@"
```

### 3. Bug Fixes in Python Script

#### Fix 1: JSON Parsing with Markdown Code Fences

**Problem:** The OpenAI API returned JSON wrapped in markdown code fences:
```
```json
{ ... }
```
```

**Solution:** Added helper function to strip code fences before parsing:

```python
def strip_markdown_code_fences(text: str) -> str:
    """Remove markdown code fences (```json ... ```) if present."""
    text = text.strip()
    pattern = r"^```(?:json)?\s*\n?(.*?)\n?```$"
    match = re.match(pattern, text, flags=re.DOTALL)
    if match:
        return match.group(1).strip()
    return text
```

Updated the JSON parsing to use this function:
```python
clean_text = strip_markdown_code_fences(output_text)
data = json.loads(clean_text)
```

#### Fix 2: PIL Image Loading

**Problem:** Custom `io_bytes` class was not properly implementing file-like interface:
```
AttributeError: 'io_bytes' object has no attribute 'seek'
```

**Solution:** Replaced custom wrapper with standard `io.BytesIO`:

```python
def postprocess_to_og(...):
    import io
    with Image.open(io.BytesIO(png_bytes)) as im:
        # ...
```

Removed the unused `io_bytes` class.

### 4. Add Social Preview Metadata

Added YAML front matter to `docs/index.md`:

```yaml
---
title: Introduction to Economics
description: An interactive intelligent textbook for learning economics fundamentals, covering microeconomics, macroeconomics, personal finance, and the digital economy.
image: img/cover.png
---
```

Added `meta` extension to `mkdocs.yml` to enable Open Graph tag generation:

```yaml
markdown_extensions:
  - meta
```

## Successful Output

```
=== Cover Image Generator ===

✓ OPENAI_API_KEY is set
✓ Python script found: /Users/dan/Documents/ws/economics-course/src/images/generate-cover-openai.py
✓ Course description found: /Users/dan/Documents/ws/economics-course/docs/course-description.md
✓ Output directory exists: /Users/dan/Documents/ws/economics-course/docs/img

Generating cover image...

Wrote: /Users/dan/Documents/ws/economics-course/docs/img/cover.png
Title: Introduction to Economics
Keywords: economics, finance, digital economy, critical thinking, microeconomics, macroeconomics
```

## Files Modified

- `src/images/generate-cover.sh` - Created shell script wrapper
- `src/images/generate-cover-openai.py` - Fixed JSON parsing and PIL image loading
- `docs/index.md` - Added social preview metadata
- `mkdocs.yml` - Added `meta` markdown extension

## Files Generated

- `docs/img/cover.png` - 1200x630 social preview cover image
