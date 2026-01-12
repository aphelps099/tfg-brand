# TFG Impact Report 2025 - WordPress Implementation Guide

This guide explains how to implement the Impact Report styling on your WordPress site at techfuturesgroup.org to match the GitHub Pages version exactly.

## Files Included

| File | Purpose |
|------|---------|
| `tfg-impact-report.css` | All styles for the impact report |
| `tfg-impact-report.js` | Animations, counters, parallax effects |
| `tfg-impact-report-template.html` | HTML template for WordPress page |

## Installation Options

### Option 1: Custom CSS in WordPress Customizer (Easiest)

1. Go to **Appearance → Customize → Additional CSS**
2. Paste the contents of `tfg-impact-report.css`
3. Click **Publish**

**Limitations:** Won't include custom fonts (GT America, Tobias)

---

### Option 2: Child Theme Installation (Recommended)

#### Step 1: Upload Font Files

Upload these files to your theme folder:
```
/wp-content/themes/tfg/assets/fonts/
├── 4618gt.woff
├── 2809gt-bold.woff
├── Tobias-Thin.woff
└── Tobias-Medium.woff
```

#### Step 2: Upload CSS and JS

Upload to your theme:
```
/wp-content/themes/tfg/assets/css/tfg-impact-report.css
/wp-content/themes/tfg/assets/js/tfg-impact-report.js
```

#### Step 3: Enqueue in functions.php

Add to your theme's `functions.php`:

```php
function tfg_enqueue_impact_report_assets() {
    // Only load on impact report page
    if (is_page('impact-report') || is_page('impact')) {

        // Google Fonts - Roboto Mono
        wp_enqueue_style(
            'google-fonts-roboto-mono',
            'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap',
            array(),
            null
        );

        // Impact Report CSS
        wp_enqueue_style(
            'tfg-impact-report',
            get_template_directory_uri() . '/assets/css/tfg-impact-report.css',
            array(),
            '1.0.0'
        );

        // Impact Report JS
        wp_enqueue_script(
            'tfg-impact-report-js',
            get_template_directory_uri() . '/assets/js/tfg-impact-report.js',
            array(),
            '1.0.0',
            true // Load in footer
        );
    }
}
add_action('wp_enqueue_scripts', 'tfg_enqueue_impact_report_assets');
```

---

### Option 3: Use a Plugin

Use a plugin like **Simple Custom CSS and JS** or **Code Snippets**:

1. Install the plugin
2. Add the CSS as a new custom CSS snippet
3. Add the JS as a new custom JS snippet
4. Set both to load only on the impact report page

---

## Page Template Structure

Create a new WordPress page and switch to the **HTML/Code editor** (not visual). Use the template in `tfg-impact-report-template.html`.

### Key Classes to Use

All classes are prefixed with `tfg-` to avoid conflicts with your theme:

| Original Class | WordPress Class |
|---------------|-----------------|
| `.section` | `.tfg-section` |
| `.section-cover` | `.tfg-section-cover` |
| `.stat-card` | `.tfg-stat-card` |
| `.counter` | `.tfg-counter` |
| `.nav-dot` | `.tfg-nav-dot` |
| etc. | etc. |

---

## Required HTML Structure

Wrap your entire impact report content in a container:

```html
<div class="tfg-impact-report">
    <!-- Progress bar -->
    <div class="tfg-progress-bar"></div>

    <!-- Navigation dots -->
    <nav class="tfg-nav">
        <button class="tfg-nav-dot active" data-section="0" data-label="COVER"></button>
        <button class="tfg-nav-dot" data-section="1" data-label="IMPACT"></button>
        <!-- ... more dots ... -->
    </nav>

    <!-- Sections -->
    <section class="tfg-section tfg-section-cover in-view" id="section-0">
        <!-- Section content -->
    </section>

    <!-- More sections... -->
</div>
```

---

## SVG Symbols

Add this SVG definitions block at the start of your page content:

```html
<svg style="display: none;">
    <symbol id="starburst" viewBox="0 0 100 100">
        <g transform="translate(50,50)" fill="none" stroke="currentColor" stroke-width="1.2">
            <line x1="0" y1="-46" x2="0" y2="-18"/>
            <line x1="0" y1="-46" x2="0" y2="-18" transform="rotate(15)"/>
            <!-- ... more lines for full starburst ... -->
        </g>
    </symbol>
    <symbol id="starburst-9" viewBox="0 0 100 100">
        <!-- 9-prong version -->
    </symbol>
</svg>
```

---

## Counter Animation Data Attributes

For animated counters, use these data attributes:

```html
<span class="tfg-counter" data-target="70" data-prefix="$" data-suffix="M+">$0</span>
```

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `data-target` | Target number | `70` |
| `data-prefix` | Text before number | `$` |
| `data-suffix` | Text after number | `M+`, `%`, `B+` |

---

## Animated Progress Bars

For grant breakdown bars:

```html
<div class="tfg-grant-bar">
    <div class="tfg-grant-bar-fill" data-width="40"></div>
</div>
```

The `data-width` value (0-100) determines how far the bar fills.

---

## Troubleshooting

### Fonts Not Loading
- Check that font files are uploaded to the correct directory
- Update the `@font-face` URLs in the CSS to match your actual paths
- Check browser console for 404 errors on font files

### Animations Not Working
- Ensure JavaScript is loaded after the HTML content
- Check browser console for JavaScript errors
- Verify the `.tfg-impact-report` wrapper class is present

### Styles Conflicting with Theme
- All classes are prefixed with `tfg-` to minimize conflicts
- If conflicts persist, add `!important` to specific CSS rules
- Consider using a page template that loads minimal theme styles

### Scroll Snap Not Working
- Scroll snap requires the container to have `overflow-y: scroll`
- Some themes may override this - check for conflicting styles

---

## File Checksums (for verification)

After uploading, verify files match:
- CSS file: ~25KB
- JS file: ~5KB

---

## Support

For issues with implementation:
1. Check browser developer console for errors
2. Verify all files are uploaded correctly
3. Test on a fresh WordPress installation if issues persist
