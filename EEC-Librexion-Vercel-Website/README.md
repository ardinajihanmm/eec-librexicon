# EEC Librexion Practice Lab

A new, independent English practice website for Engineering English Club. This is not a duplicate of the Practical English Survival Guide booklet.

## What's inside

- 6 skill pathways and 48 original questions
- Advanced grammar, vocabulary precision, critical reading, academic writing, professional scenarios, and independently written exam-style practice
- Instant answer explanations
- Daily challenge with one question from each pathway
- Saved pathways, personal best scores, mistake review, and retry
- Responsive desktop and mobile design
- Navy `#143140` and pink `#ff66c4`
- Plus Jakarta Sans font, with Poppins fallback
- Inline icons with no emoji
- QR code generator for the public website URL

## Updating the existing website on Vercel

Your GitHub repository was named `eec-librexicon`. In your earlier screenshot the files lived inside the folder `EEC-Librexion-Vercel-Website`.

1. Extract the new ZIP on your computer.
2. Open your GitHub repository and navigate into `EEC-Librexion-Vercel-Website`, which was used as the Vercel Root Directory.
3. Replace its old `index.html`, `style.css`, `app.js`, `content.js`, `favicon.svg`, `vercel.json` and `vendor/qr.js` with the corresponding new files from this ZIP. Add this README too if desired. Do not upload a second nested ZIP or an extra folder inside that folder.
4. Commit the changes on GitHub. When the GitHub integration is connected, Vercel automatically deploys the new version.
5. Visit the existing domain, reload, and open **Share / QR** to download the QR code for the website.

Alternative: put the files at the GitHub repository root and clear the project's Root Directory setting on Vercel before deploying. Use only one of these two methods.

This is a static site. No `npm install`, database, environment variables, or framework are required. Vercel framework preset: **Other**. Output directory: leave blank.

## Editing the questions later

Edit `content.js` directly on GitHub. Each course has a `questions` array. Change a `prompt`, `options`, `answer`, `explanation`, or the course `notes`, then commit.

For multiple-choice questions, answer is a zero-based index: `0` means A, `1` means B, `2` means C, and `3` means D. For short answers, answer is a string or array of acceptable strings. Preserve JavaScript punctuation.

## QR code

Share / QR creates a code that points to the permanent website domain, not to one specific lesson. As long as the domain stays the same, the QR will work after future updates. The website must be accessed using its deployed URL to generate the public QR.

## Progress and privacy

The browser saves bookmarks, scores, and current session using localStorage. Progress stays on that device and browser, is not synchronized elsewhere, and may be lost when browser storage is cleared.

## Credits

Learning material was written for this practice lab. `vendor/qr.js` is a bundled MIT licensed QR library based on QRCode for JavaScript by Kazuhiko Arase (attribution included within the source).

Exam-style items are independently written educational questions and not official TOEFL questions.
