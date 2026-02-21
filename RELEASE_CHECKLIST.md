# Release Checklist

## Before release
- [ ] Replace screenshot placeholders in `assets/screenshots/`
- [ ] Update `CHANGELOG.md`
- [ ] Verify `hacs.json` metadata
- [ ] Test card in Home Assistant (`custom:word-stack-clock-card`)
- [ ] Confirm resource path `/local/word-stack-clock-card.js`

## Create release
- [ ] Commit changes to `main`
- [ ] Create Git tag (example): `git tag v1.0.0`
- [ ] Push tag: `git push origin v1.0.0`
- [ ] Wait for GitHub Action `Release` to complete

## After release
- [ ] Verify GitHub release assets are attached
- [ ] In HACS add/update custom repository
- [ ] Install/update card from HACS
