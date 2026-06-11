# Security Rotation Required

Rotate the following credentials manually in their provider dashboards. Do not commit replacement values.

## CJ Affiliate

- `CJ_PERSONAL_ACCESS_TOKEN`

Reason: a populated local value was found in `.env.local`, and this token has been shared outside the provider dashboard workflow. Generate a new token in CJ, update Vercel/local environment variables, then revoke the old token.

## Verification After Rotation

- Confirm the new value is stored only in Vercel environment variables and local untracked `.env.local`.
- Confirm `.env.local` remains ignored by Git.
- Run `npm run import:cj` locally only after the new token is installed.
