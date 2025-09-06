# ACAC XHTML + Rivets Rules (with external libs allowed)

## Ground Rules
- **Static site**: Everything lives in `/site/`, versioned directly.  
- **Pages**: `.html` files must be **XHTML well-formed**.  
- **Frontend**: Rivets.js for state/binding.  
- **External libraries/scripts are allowed**, but:
  - Must be imported as `<script src="…"></script>` or `<link rel="stylesheet" … />`.  
  - All script/link tags must be XHTML-valid (self-closed, quoted attrs).  
  - No server-side runtime or build step required.  

## XHTML Conventions
- Root: `<!DOCTYPE html>` and `<html xmlns="http://www.w3.org/1999/xhtml" lang="en">`.  
- Lowercase tags and attributes.  
- Attributes always quoted.  
- Void elements self-closed (`<br />`, `<img />`).  
- `alt` required on `<img />`.  
- Unique IDs per page.  

## Rivets Usage
- Bind state through `rivets.bind(document.getElementById('app'), state)`.  
- Allowed binders: `rv-text`, `rv-html` (sanitized), `rv-if`, `rv-each-*`, `rv-on-*`.  
- No inline event attributes like `onclick`; always use `rv-on-*`.  

## Process Rules
### Thin Slice
- One component or page per PR.  
- ≤10 files touched.  
- No “big bang” refactors.  

### JOA (Justifiable / Observable / Auditable)
- **Justifiable**: 1–3 bullets tying the change to user outcomes.  
- **Observable**: visual check, XHTML validation, Rivets binding works.  
- **Auditable**: PR body includes spec, before/after screenshots, what rules applied.  

### ADREI Workflow
- **Analyze**: Confirm scope, list acceptance + observables.  
- **Draft**: Plan edits (≤10 files).  
- **Review**: Human QA verifies XHTML + behavior.  
- **Edit**: Apply fixes.  
- **Integrate**: Merge after checks pass and evidence attached.  

## Observability
- Manual XHTML validation (browser validator or XML parser).  
- Screenshots/GIFs in PR for interactive behavior.  
- PR template is the record of Thin Slice + JOA + ADREI evidence.  

## Memory Pointers
- Design docs in `/docs/design/` (wireframes, specs, images).  
- Tech references in `/docs/tech/`.  
- All prompts should read these before starting `Analyze`.