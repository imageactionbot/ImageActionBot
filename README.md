# ImageActionBot — landing site

Static site for **ImageActionBot** (Light Edition). Served well from **GitHub Pages**.

**GitHub repo description (copy-paste):**  
`Official ImageActionBot website — download the Windows automation tool (ZIP via Telegram t.me/imageactionbot/6). Static site, GitHub Pages.`

## Go live on GitHub Pages

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `imageactionbot-website`). **Do not** add a README if you will push this folder as the first commit.

2. In this folder (PowerShell or Git Bash):

   ```bash
   git init
   git add .
   git commit -m "Initial site: landing + assets"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment**  
   - Source: **Deploy from a branch**  
   - Branch: **main** / folder **/ (root)**  
   - Save.

4. After a minute or two your site will be at:

   `https://YOUR_USER.github.io/YOUR_REPO/`

   Use **exact casing** for your username/repo in the URL.

## Before you publish

- Add **`assets/IMAGEACTIONBOT.PNG`** (logo) if not already in the repo.
- Optional banner: **`assets/banner.png`** + edit **`assets/ad.json`** (top strip on the site).

## Download link

ZIP download points to Telegram: [t.me/imageactionbot/6](https://t.me/imageactionbot/6)

## Custom domain (optional)

In the same **Pages** settings, set your domain and add the DNS records GitHub shows. For `www.imageactionbot.com`, use your DNS host’s docs + [GitHub custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
