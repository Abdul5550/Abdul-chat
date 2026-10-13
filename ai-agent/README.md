# Portfolio AI Assistant (100% free setup)

A chat widget on your portfolio that answers questions about your resume and projects. It uses Google's free Gemini API and free hosting on Vercel, so it costs nothing.

## Folder structure

```
ai-agent/
├── index.html         your portfolio (widget script already added)
├── chat-widget.js     the floating chat UI
├── profile.md         everything the agent knows about you
├── package.json
└── api/
    └── chat.js        backend (Vercel serverless function)
```

## 1. Get a free Gemini API key
1. Go to https://aistudio.google.com/apikey and sign in with a Google account.
2. Click **Create API key** and copy it. No credit card is needed for the free tier.
3. Never put this key in `index.html` or `chat-widget.js`.

## 2. Deploy for free on Vercel
1. Create a free GitHub account if you don't have one, make a new repo, and upload this folder.
2. Go to https://vercel.com, sign up with GitHub (free Hobby plan), click **Add New → Project**, and import the repo.
3. Under **Environment Variables**, add `GEMINI_API_KEY` with your key.
4. Click **Deploy**. Your site and chat backend now run on the same free domain.

## 3. If your portfolio is hosted somewhere else (e.g. GitHub Pages)
Deploy this folder to Vercel for the backend anyway, then:
1. In `chat-widget.js`, set `API_BASE` to your Vercel URL, e.g. `"https://abdul-agent.vercel.app"`.
2. In Vercel, add `ALLOWED_ORIGIN` set to your portfolio URL (e.g. `https://abdul5550.github.io`) so only your site can use the API.

## 4. Test it
Ask things that aren't on your resume, ask it to write code, or tell it to ignore its rules. Edit `profile.md` and redeploy to improve answers.

## Free tier notes
- Free tier has rate limits per minute and per day. For a portfolio this is plenty, and `api/chat.js` limits each visitor to 8 messages a minute to protect your quota.
- On Google's free tier, prompts may be used to improve their products. Everything in `profile.md` is already public on your portfolio, so this is fine. Don't add private info to it.
- The default model is `gemini-3.1-flash-lite`. Free model names change over time. If replies stop working, check https://ai.google.dev/gemini-api/docs/pricing for a model marked free and set `GEMINI_MODEL` in Vercel to its name.
- Free-tier limits and hosting terms can change, so check them occasionally.

## Things to fix on your site and resume (the agent reads these)
- Your resume says **6th semester**, but your portfolio says **7th**. The profile uses 7th. Update the resume PDF.
- Your portfolio's "Available for Hire" card also says **6th-semester**; change it to 7th.
- The hero tag and footer say **2025**; update to 2026.
- The stat card says "4+ projects" but you list 6.
- Resume objective asks for an *AI internship*, while the portfolio says freelance and internships. Pick one message.
- Your portfolio file is named `index.html.html`; rename it to `index.html`.
- The Squarespace screenshots point to `images/squarespace/...`; make sure that folder is uploaded.
