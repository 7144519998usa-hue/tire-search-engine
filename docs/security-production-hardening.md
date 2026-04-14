# Production Security Hardening

This document defines the live infrastructure controls required to move TireSearchEngine.com from app-safe to production-grade hardened.

## Cloudflare edge protection

Required controls:

- enable Cloudflare managed WAF rules
- enable DDoS protection
- enable bot management or equivalent bot fight mode
- create edge rate limits for:
  - `/visit/*`
  - `/api/affiliate-click`
  - `/api/v1/offers/search`
  - `/api/v1/installers/search`
- create challenge or block rules for suspicious non-browser traffic

## Hidden origin and CDN-only access

Required controls:

- restrict origin to Cloudflare IP ranges or platform allowlist
- use an origin/shared secret header where possible
- prevent direct origin access from the public internet

App support:

- middleware supports `TSE_EDGE_SHARED_SECRET` via `x-tse-edge-secret` for protected routes

## SSH and firewall lockdown

Required controls:

- disable password SSH login
- allow SSH only from approved operator IPs or VPN
- enable host firewall with least-privilege ingress
- close all non-essential ports
- keep SSH keys rotated and inventoried

## Secrets management

Required controls:

- store production secrets in a managed secrets platform
- do not keep long-lived secrets only in flat files
- rotate secrets on a schedule and after incidents
- keep encrypted backup of critical env configuration

## Alerting

Minimum alert coverage:

- WAF spikes
- DDoS events
- bot spikes
- origin 5xx spikes
- auth failures on admin/protected paths
- dependency scan failures
- backup or restore simulation failures

## Weekly and monthly drills

- weekly: vulnerability scan review
- monthly: restore simulation
- monthly: penetration simulation or structured attack replay

Record results in:

- `security-health.config.json`
- restore and backup reports
