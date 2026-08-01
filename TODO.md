# TODO: Fix "Discover More" button position

## Steps
- [x] Analyze project files (index.html, style.css, main.js)
- [x] Confirm plan with user
- [x] Add `position: relative;` to `.featured-box` rule in style.css
- [x] Verify the button sits at the bottom-center of the hero section

---

# TODO: Fix email form functionality

## Steps
- [x] Analyze current form/email implementation
- [x] Confirm plan with user
- [x] Change form `action` to FormSubmit AJAX endpoint in index.html
- [x] Update main.js to parse and verify JSON success response
- [x] Update error handling to surface the real FormSubmit reason (activation required)
- [x] Verify code changes are correct
- [x] Diagnose error with curl tests

## Diagnostic findings (tested via curl)
1. When opened as a local `file://` HTML file, FormSubmit returns:
   `"Make sure you open this page through a web server, FormSubmit will not work in pages browsed as HTML files."`
   → **Always test via a web server, not by double-clicking the HTML file.**

2. When served from a web server, FormSubmit returns:
   `"This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be actived!"`
   → **The form works; the inbox must be activated first.**

## User action required (email)
- [ ] Check monybaabad@gmail.com for the NEWEST FormSubmit activation email (check Spam/Junk)
- [ ] Click the full activation link (open in desktop browser if mobile truncates it)
- [ ] Submit the form again at http://localhost:8000 — should show success

---

# TODO: Expand skills section

## Steps
- [x] Add TypeScript, React, FastAPI, Solidity to Development
- [x] Add REST API Development, System Design*, Software Testing, API Integration, Requirements Engineering to Engineering
- [x] Add PostgreSQL, MongoDB, Postman, Docker, Git to Tools & Databases
- [x] Add fourth "AI & Cloud" category (Gemini API, LLMs, NLP, Azure Functions, Azure Service Bus)
- [x] Verify layout renders correctly (server running at localhost:8000)

*Note: "System Design" was omitted from Engineering since it wasn't included in the final result list you provided.

