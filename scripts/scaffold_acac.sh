#!/usr/bin/env bash
set -euo pipefail

# Idempotent scaffold for ACAC + Cline
mkdir -p \
  .cline/prompts .cline/messages .cline/memory \
  .github/workflows \
  cms \
  content/pages content/posts content/data \
  public/assets public/media \
  src/templates src/styles src/scripts src/build \
  dist

touch \
  .cline/memory/.gitkeep \
  content/pages/.gitkeep content/posts/.gitkeep content/data/.gitkeep \
  public/assets/.gitkeep public/media/.gitkeep \
  src/templates/.gitkeep src/styles/.gitkeep src/scripts/.gitkeep src/build/.gitkeep \
  dist/.gitkeep

# Write helper: only create file if absent (keeps Thin Slice clean if rerun)
mkfile() {
  local path="$1"; shift
  if [[ -e "$path" ]]; then
    echo "SKIP (exists): $path"
  else
    mkdir -p "$(dirname "$path")"
    cat > "$path" <<'EOF'
'"$@"'
EOF
    echo "CREATE: $path"
  fi
}

mkfile ".cline/context.md" '# ACAC Ground Rules (stub)
- Pure static; Decap → Markdown/MDX in `content/`.
- Outputs: strict XHTML5 (+ JSON mirrors). Validate in CI.
- Interactivity: Rivets.js binders only (rv-*, no inline events).
- Process: Thin Slice, JOA, ADREI passes.'

mkfile ".cline/prompts/adrei.thin-slice.md" '# ADREI Thin Slice Task (stub)
## Analyze
- Title:
- Why (JOA, ≤3 bullets):
- Acceptance:
- Observables:
## Draft
- Plan (steps):
- Files to touch (≤10):
## Review (QA)
## Edit (Dev)
## Integrate'

mkfile ".cline/messages/scope-guard.md" 'Per Thin Slice, this spans multiple scopes. I propose slices (1–n): … Pick one; I’ll run ADREI starting with Analyze.'

mkfile ".clineignore" '# Optionally ignore large binaries:
# /public/media/**/*.psd'

mkfile "cline.config.json" '{
  "model": "gpt-4o-mini",
  "apiKeyEnv": "OPENAI_API_KEY",
  "contextStrategy": "embedding",
  "memory": { "path": ".cline/memory" },
  "tools": { "filesystem": true, "terminal": true },
  "projectRoot": ".",
  "systemPrompt": "Honor rules: Thin Slice; JOA; ADREI (Analyze→Draft→Review→Edit→Integrate). ACAC: pure static, Decap→MD/MDX, strict XHTML (+JSON), Rivets rv-*, no inline events, Netlify deploys. Refuse multi-scope; propose a queue."
}'

mkfile ".github/PULL_REQUEST_TEMPLATE.md" '### Thin Slice
- [ ] Single component only
- Touched files (≤10):

### JOA
- Why (≤3 bullets):
- Observables (tests/metrics):

### ADREI Pass Log
- Analyze:
- Draft:
- Review (QA):
- Edit:
- Integrate:'

mkfile "netlify.toml" '[build]
  command = "npm run build"
  publish = "dist"'

mkfile "cms/config.yml" 'backend:
  name: git-gateway
  branch: main
media_folder: "public/media"
public_folder: "/media"
collections: []'

mkfile "README.md" '# ACAC + Cline Skeleton
This repo is scaffolded for the ACAC stack with Cline support.
Populate `.cline/context.md` with full rules.'

echo "DIR COUNT: $(find . -type d | wc -l)"
echo "FILE COUNT: $(find . -type f | wc -l)"
echo "TREE SNAPSHOT (depth 3):"
find . -maxdepth 3 -print | sort
