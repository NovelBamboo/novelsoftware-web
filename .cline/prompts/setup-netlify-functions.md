# Setup Netlify Functions Project

## Prompt
You are an AI coding assistant.  
Task: Scaffold a minimal Netlify project in the current repo with one static page and one serverless function.

## Requirements
### 1. Create a project structure:
```
/netlify/functions
└── hello.js
netlify.toml

````
### 2. **netlify/functions/hello.js**:  
```js
exports.handler = async () => {
  return {
    statusCode: 200,
    body: "Hello from Netlify Function!",
  };
};
````
### 3. **netlify.toml**:

   ```toml
   [build]
     functions = "netlify/functions"
     publish = "."
   ```

5. Ensure everything is committed and ready for GitHub push, so Netlify can auto-deploy.

### Notes

* Do **not** add package.json or Node build tooling — just pure static files and the functions folder.
* Output should be the created files with their full contents.

```

---

👉 Save this as `.cline/prompts/setup-netlify.md`.  
Then in Cline, you can run:

```

cline run setup-netlify

```

and it will generate the repo skeleton.  

Do you want me to also include instructions in the same prompt for automatically committing + pushing to GitHub (so the deploy triggers immediately), or do you prefer to keep that as a manual step?
```
### 4. Install Netlify CLI
```
npm install -g netlify-cli
````