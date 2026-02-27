# Checkpoints

Use **Git tags** as checkpoints so you can return to a known good state anytime.

## Current checkpoints

| Tag | Description |
|-----|-------------|
| `checkpoint-simple-homepage` | Simple one-page site, five emails (jreinhardt, info, recruiting, partners, support), no homeowner/support sections |

## How to revert to a checkpoint

**Option A – Restore the whole project to that point**
```bash
cd northstar-vercel
git checkout checkpoint-simple-homepage
```
You’ll be in “detached HEAD” (you’re viewing that version). To make it your main branch:
```bash
git checkout -b main-restored
# or to overwrite main:
git branch -f main checkpoint-simple-homepage
git checkout main
```

**Option B – Compare or copy files from that point**
```bash
git show checkpoint-simple-homepage:app/page.tsx   # view file as it was
git checkout checkpoint-simple-homepage -- app/page.tsx   # restore one file
```

## How to create a new checkpoint (do this often)

1. Commit your current work (or stash it).
2. Create a tag with a short, clear name:
   ```bash
   git tag -a checkpoint-<name> -m "Short description of what this state is"
   ```
   Examples:
   - `checkpoint-before-redesign`
   - `checkpoint-after-contact-form`
   - `checkpoint-v2-homeowner-section`
3. Push the tag to GitHub (optional, so it’s backed up):
   ```bash
   git push origin checkpoint-<name>
   ```

## List your checkpoints

```bash
git tag -l
```

To see the message for a tag:
```bash
git show checkpoint-simple-homepage --no-patch
```
