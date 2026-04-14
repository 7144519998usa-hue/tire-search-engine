# TireSearchEngine

TireSearchEngine is a Next.js application for US-focused tire discovery and comparison.

Local development:
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run backup:db`
- `npm run backup:full`
- `npm run backup:offsite`

Operational rules:
- use environment variables for runtime configuration
- keep non-production environments protected
- do not commit credentials, raw exports, or confidential planning artifacts

Backup and recovery:
- backup scripts live in [scripts](/C:/TireSearchEngine/scripts)
- protocol is documented in [backup-disaster-recovery-protocol.md](/C:/TireSearchEngine/docs/backup-disaster-recovery-protocol.md)
- restore steps live in [disaster-recovery.md](/C:/TireSearchEngine/docs/disaster-recovery.md)
