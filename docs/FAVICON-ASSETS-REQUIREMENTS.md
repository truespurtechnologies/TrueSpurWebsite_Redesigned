# Favicon Assets Requirements - RC1 Final Polish

## Status
**Metadata configured, assets pending delivery**

## Required Assets

All assets must be generated from the official TrueSpur logo (source: `/public/logo/truespur-main-logo.png`).

### Asset Locations and Specifications

| Asset | Path | Size | Format | Purpose |
|-------|------|------|--------|---------|
| favicon.ico | `/public/favicon.ico` | 16×16, 32×32 | ICO | Browser tab icon (fallback) |
| icon-16x16.png | `/public/icon-16x16.png` | 16×16 | PNG | PWA icon (small) |
| icon-32x32.png | `/public/icon-32x32.png` | 32×32 | PNG | PWA icon (medium) |
| apple-touch-icon.png | `/public/apple-touch-icon.png` | 180×180 | PNG | iOS home screen |
| android-icon-192x192.png | `/public/android-icon-192x192.png` | 192×192 | PNG | Android home screen |
| android-icon-512x512.png | `/public/android-icon-512x512.png` | 512×512 | PNG | Android splash screen |

## Metadata Configuration

`app/layout.tsx` lines 29-32 configured to consume these assets:

```typescript
icons: {
  icon: '/favicon.ico',
  shortcut: '/favicon.ico',
  apple: '/apple-touch-icon.png',
},
```

## Design Guidelines

- Use TrueSpur logo with orange accent (#F97316)
- Maintain brand consistency with existing logo assets
- Ensure sufficient contrast on all backgrounds
- Follow Apple Human Interface Guidelines for touch icon
- Follow Android Material Design guidelines for PWA icons

## Generation Tools

Recommended tools for asset generation:
- Favicon.io (https://favicon.io/) - Free, generates all sizes from PNG
- RealFaviconGenerator (https://realfavicongenerator.net/) - Comprehensive, includes platform-specific optimizations
- ImageMagick (CLI) - `convert source.png -resize 16x16 icon-16x16.png`

## Post-Generation Checklist

- [ ] All assets placed in `/public/` root
- [ ] favicon.ico loads in browser tab
- [ ] Apple touch icon visible on iOS home screen
- [ ] Android icons visible on Android home screen
- [ ] No visual artifacts or compression issues
- [ ] Brand colors preserved across all sizes

## References

- Brand Identity Guidelines: `docs/brand-identity-guidelines.md`
- Design System: `docs/design-system.md`
