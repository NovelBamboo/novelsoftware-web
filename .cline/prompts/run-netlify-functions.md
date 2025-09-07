# TRun Netlify Functions Locally (Codespaces / Containers)

## Prompt
Provide clear steps to run and test Netlify Functions locally inside Codespaces (or other containerized IDEs) without deploying to GitHub/Netlify first.

## Context & Steps

### 1. Start local dev server
Use a fixed port (3000 works reliably in Codespaces):

```bash
netlify dev --port 3000
````

* Functions are served at:

  ```
  https://<forwarded-url>/.netlify/functions/<name>
  ```

* Example:

  ```
  https://<forwarded-url>/.netlify/functions/hello
  ```
### 3. Quick function-only sanity check

Run the function without Netlify dev (doesn’t simulate headers/event, but proves logic):

```bash
node -e "require('./netlify/functions/hello').handler().then(console.log)"
```

### 4. Common files for setup

* **netlify.toml**

  ```toml
  [build]
    publish = "."
    functions = "netlify/functions"
  ```

* **netlify/functions/hello.js**

  ```js
  exports.handler = async () => ({
    statusCode: 200,
    body: "Hello from Netlify Function!"
  });
  ```

---

## Notes

* Ignore the warning:

  ```
  Error: Unable to open browser automatically: Running inside a docker container
  ```

  That just means Netlify can’t auto-launch your browser — you still use the forwarded or live URL.

* Codespaces → open the **Ports** panel, set port 3000 to Public, and copy the generated URL.

---

## Outcome

You can now test Netlify Functions directly from Codespaces (or any dev container) **before** committing or deploying.

```

---

✅ Save this as `.cline/prompts/run-netlify-functions.md` and you’ll always have the workflow handy.  

Do you also want me to combine this with your **setup prompt** so Cline can both scaffold the files *and* start the dev server automatically in one run?
```
