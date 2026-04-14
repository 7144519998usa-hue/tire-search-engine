# TireSearchEngine Future Vertical Opportunity Register

This register captures adjacent mobility-tire categories that the current publishing engine should remain capable of supporting later without architectural redesign.

## Current Ranking

1. RV tires
2. Golf cart tires
3. Motorcycle tires
4. Bicycle tires

## Why This Exists

The current system is being built for passenger, truck, commercial-truck, EV, vehicle-fitment, and education pages first.

This register keeps the architecture honest by forcing the platform to preserve:

- canonical resolver reuse
- shared page registry and publish-state logic
- shared sitemap and indexation governance
- shared regeneration and dependency tracking
- per-vertical route families, thresholds, and metadata overrides

## Vertical Notes

### RV tires

- strongest adjacent fit to the current truck/trailer logic
- supports size pages, load-range pages, and seasonal/use-case pages
- likely the best next expansion once current automotive growth is stable

### Golf cart tires

- easier than motorcycle or bicycle from a structural standpoint
- good candidate for a focused adjacent branch with lower engineering overhead
- size and terrain logic can reuse much of the current page framework

### Motorcycle tires

- compelling demand, but materially more complex
- front/rear pairing, category nuance, and fitment behavior need dedicated logic
- should be treated as a separate vertical on the same platform, not a quick extension

### Bicycle tires

- possible future authority branch
- lower monetization fit and more specialized size standards make it a later-priority candidate
- should not be activated until a clear data and monetization case exists
