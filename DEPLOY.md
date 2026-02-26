# Deploy Northstar to Vercel

## 1. Create a GitHub repo

1. Go to [github.com/new](https://github.com/new).
2. Repository name: `northstar-energy-partners` (or any name).
3. Choose **Public**, leave "Add a README" **unchecked**.
4. Click **Create repository**.

## 2. Push this project to GitHub

In Terminal, from this folder (`northstar-vercel`):

```bash
cd "/Users/jamesreinhardt/Desktop/Curser/App/Move it!/northstar-vercel"

# Replace YOUR_USERNAME and YOUR_REPO with your GitHub username and repo name
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

If you use SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**).
2. Click **Add New…** → **Project**.
3. **Import** the repo you just pushed (`northstar-energy-partners` or whatever you named it).
4. Leave settings as-is (Framework: Next.js, Root Directory: `.`).
5. Click **Deploy**. Wait for the build to finish.

## 4. Add your domain

1. In the Vercel project, go to **Settings** → **Domains**.
2. Enter your domain (e.g. `northstarenergypartners.com`) and follow the steps.
3. At your domain registrar, add the DNS records Vercel shows (usually an A record or CNAME). Vercel will issue SSL automatically.

## 5. Future updates

- Edit the site in **`northstar-next`** (your main project in "Move it!").
- When you’re ready to go live with changes, copy to this folder and push:

  ```bash
  cp -R "/Users/jamesreinhardt/Desktop/Curser/App/Move it!/northstar-next"/* "/Users/jamesreinhardt/Desktop/Curser/App/Move it!/northstar-vercel/"
  cd "/Users/jamesreinhardt/Desktop/Curser/App/Move it!/northstar-vercel"
  git add .
  git commit -m "Update site"
  git push
  ```

  Vercel will automatically redeploy on every push to `main`.
