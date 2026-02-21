# Word Stack Clock Card

Custom Lovelace card for Home Assistant inspired by editorial stacked clocks:
- large hour/minute digits on the left
- vertical divider
- hour/minute written in words on the right

Current version: **v1.0.0**

## Preview

![Mobile placeholder](./assets/screenshots/Card.png)

## Installation

### HACS (custom repository)
1. Push this folder to a dedicated GitHub repository.
2. In Home Assistant, open HACS.
3. Add custom repository:
   - URL: your GitHub repo URL
   - Category: Dashboard
4. Install **Word Stack Clock Card**.
5. Reload Home Assistant frontend.

### Manual
1. Copy `word-stack-clock-card.js` to `/config/www/`.
2. Add a Lovelace resource:
   - URL: `/local/word-stack-clock-card.js`
   - Type: `JavaScript module`

## Lovelace configuration

```yaml
type: custom:word-stack-clock-card
language: it
use_24h: false
background: '#bdbdbd'
text_color: '#101010'
divider_color: '#101010'
height: 340
```

## Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `language` | string | `en` | `en` or `it` |
| `use_24h` | boolean | `false` | Use 24-hour format |
| `background` | string | `#bdbdbd` | Card background color |
| `text_color` | string | `#101010` | Main text color |
| `divider_color` | string | `#101010` | Vertical divider color |
| `height` | number | `340` | Card min-height in px |

## Development notes

- Main file: `word-stack-clock-card.js`
- Card type: `custom:word-stack-clock-card`
- Release flow: push a semantic tag (`vX.Y.Z`) to trigger automatic GitHub Release
- Detailed steps: `RELEASE_CHECKLIST.md`

## License

MIT
