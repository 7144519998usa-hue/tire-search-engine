# Route Governance Notes

This application uses controlled route generation and staged publication rules.

Principles:
- keep generation logic server-side
- publish only approved, index-worthy URLs
- avoid documenting future route families in shared repo docs
- keep canonical and sitemap decisions deterministic and tightly scoped
