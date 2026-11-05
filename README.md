# Head Turners — Premium Luxury Salon Website

Production-ready static website for Head Turners, Guwahati, Assam.

## Deployment

1. Upload the entire folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel).
2. No build step required — pure HTML/CSS/JS.

## Before Launch — Required Replacements

| Item | Action |
|------|--------|
| **Salon photography** | Replace all Unsplash placeholder URLs with licensed images of Head Turners. Save optimised WebP/AVIF files to `assets/images/` and update `<img src>` paths. |
| **Google Maps embed** | The current iframe uses a generic address query. Generate a verified embed from the salon's Google Business Profile: Google Maps → search business → Share → Embed a map → copy iframe. Replace the iframe in `index.html` (#contact). |
| **Google review link** | Add the verified Google Business Profile URL to the reviews section and footer. |
| **Opening hours** | Add confirmed hours to the contact section and LocalBusiness structured data. |
| **Social media** | Add verified profile URLs to the footer only after confirmation. |
| **Favicon** | Replace `assets/images/favicon.svg` with the salon's favicon. |
| **OG image** | Add `assets/images/og-image.jpg` (1200×630px). |
| **Individual testimonials** | Add verified customer reviews only. Do not fabricate names or ratings. |
| **Service availability** | Confirm each proposed service category is offered before publishing. Update the disclaimer text in the Services section. |

## LocalBusiness Structured Data

Add the following JSON-LD to `index.html` inside `<head>` **after confirming all details**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Head Turners",
  "image": "https://your-domain.com/assets/images/salon-exterior.jpg",
  "url": "https://your-domain.com",
  "telephone": "+919706045070",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hem Baruah Road, Church Campus",
    "addressLocality": "Guwahati",
    "addressRegion": "Assam",
    "postalCode": "781001",
    "addressCountry": "IN"
  }
}
</script>