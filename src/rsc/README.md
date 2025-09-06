# Link Component

Custom Link component that provides automatic RSC navigation, similar to Next.js Link.

## Usage

```jsx
import { Link } from '../rsc/Link'

// Basic usage
<Link href="/slide?page=2">Next Slide</Link>

// With custom styling
<Link 
  href="/slide?page=3" 
  className="button-primary"
>
  Go to Page 3
</Link>

// With custom onClick handler
<Link 
  href="/slide?page=4"
  onClick={(e) => {
    if (someCondition) {
      e.preventDefault() // Prevent navigation
    }
  }}
>
  Conditional Navigation
</Link>
```

## Features

- ✅ **Automatic RSC Navigation**: Intercepts clicks and uses `history.pushState()`
- ✅ **External Link Support**: Handles external links normally (no interception)
- ✅ **Custom onClick**: Supports custom click handlers with preventDefault support
- ✅ **Accessibility**: Maintains proper `<a>` semantics and href attributes
- ✅ **SEO Friendly**: Real URLs that work with search engines and screen readers

## How it Works

1. **Click Interception**: Prevents default browser navigation for internal links
2. **History API**: Uses `window.history.pushState()` to update the URL
3. **RSC Trigger**: The URL change triggers `listenNavigation` in `entry.browser.tsx`
4. **Automatic Fetch**: `listenNavigation` automatically fetches the RSC payload
5. **Page Update**: React re-renders with the new server components

## Comparison with Next.js Link

| Feature | Next.js Link | Custom Link |
|---------|-------------|-------------|
| RSC Navigation | ✅ Built-in | ✅ Via listenNavigation |
| Prefetching | ✅ Automatic | ❌ Not implemented |
| Client-side routing | ✅ Router | ✅ History API |
| External links | ✅ Auto-detect | ✅ Auto-detect |
| TypeScript | ✅ Full support | ✅ Full support |

## Integration with listenNavigation

This Link component is designed to work seamlessly with the `listenNavigation` system in `entry.browser.tsx`:

1. Link component calls `history.pushState(href)`
2. `listenNavigation` detects the URL change via its pushState hook
3. `fetchRscPayload()` is automatically called
4. New RSC payload is fetched and applied
5. Page content updates without full page reload