# Tanova Blog

A complete modern personal blog website built with only HTML5, CSS3, and vanilla JavaScript. No frameworks, no backend, no dependencies.

---

## Project Structure

```
blog/
├── index.html          Homepage
├── article.html        Single article page
├── about.html          About page
├── contact.html        Contact page
├── bookmarks.html      Saved articles page
│
├── css/
│   └── style.css       All styles
│
├── js/
│   ├── posts.js        Blog post data and helper functions
│   ├── main.js         Homepage logic (rendering, search, filters, etc.)
│   └── article.js      Article page logic (likes, comments, share)
│
├── images/             Place your images here
│   ├── post-1.jpg
│   ├── post-2.jpg
│   ├── post-3.jpg
│   └── post-4.jpg
│
└── README.md
```

---

## How to Run

1. Open the `blog/` folder in VS Code
2. Open `index.html` in your browser (right-click → Open with Live Server, or just double-click the file)
3. No installation, no server, no build step required

---

## How to Add Images

Place your images inside the `images/` folder. Each post references its image via the `image` field in `posts.js`:

```js
image: "images/post-1.jpg"
```

For the best result, use landscape images (16:9 ratio) at around 800×450px.

---

## How to Add a New Article

Open `js/posts.js` and add a new object to the `posts` array:

```js
{
    id: 9,
    title: "Your Article Title",
    category: "Technology",
    author: "Tanova",
    date: "October 10, 2026",
    readingTime: "4 min read",
    image: "images/post-1.jpg",
    excerpt: "A short summary shown on cards.",
    featured: false,
    popular: false,
    content: `
        <p>Your full article content goes here.</p>
        <h2>A Subheading</h2>
        <p>More content...</p>
    `
}
```

The article will automatically appear in the grid, search, and category filters.

---

## How to Change the Blog Name

1. Open each HTML file and find `TAN<span>OVA</span>` in the header and footer
2. Replace with your preferred name
3. Update the `<title>` and `<meta name="description">` tags in each file

---

## How to Change Colors

Open `css/style.css` and edit the CSS variables at the top:

```css
:root {
    --primary: #078516;   /* Main brand color */
    --background: #F8FAFC;
    --text: #1F2937;
    /* ... */
}

[data-theme="dark"] {
    --primary: #22C55E;   /* Dark mode brand color */
    /* ... */
}
```

---

## localStorage Keys Used

| Key | Purpose |
|-----|---------|
| `tanovaTheme` | Saved theme preference (light/dark) |
| `tanovaBookmarks` | Array of saved post IDs |
| `tanovaLikes` | Array of liked post IDs |
| `tanovaComments` | Object mapping post IDs to comment arrays |
| `tanovaNewsletter` | Subscribed email address |

---

## Features

- Dark / light mode with localStorage persistence
- Search across title, excerpt, category, author
- Category filtering
- Like articles (stored in localStorage)
- Bookmark / save articles
- Comments (frontend only, stored in localStorage)
- Share via Web Share API, WhatsApp, Facebook, X/Twitter, or copy link
- Newsletter subscription (frontend demo)
- Contact form with validation (frontend demo)
- Fully responsive (mobile, tablet, desktop)
- Accessible semantic HTML throughout

---

## Deploy to GitHub Pages

1. Create a GitHub repository
2. Upload all files (maintaining the folder structure)
3. Go to Settings → Pages
4. Select the `main` branch as the source
5. Your site will be live at `https://yourusername.github.io/repository-name/`

## Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel` (or use the web dashboard)
2. Run `vercel` inside the `blog/` folder
3. Follow the prompts — Vercel will detect it as a static site
4. Your site will be live immediately
