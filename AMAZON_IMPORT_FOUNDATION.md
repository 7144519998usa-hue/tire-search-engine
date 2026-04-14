# Protected Import Notes

Bulk offer imports must use protected internal workflows.

Requirements:
- no raw partner exports committed to source control
- no live tracking identifiers in tracked files
- no public upload or sync endpoints
- sanitize examples before sharing with developers
- move operational imports into authenticated storage or jobs
