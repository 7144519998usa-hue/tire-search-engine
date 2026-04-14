# Secret Rotation Checklist

Rotate or verify the following before launch:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `TSE_REDIRECT_SECRET`
- `TSE_INTERNAL_API_KEY`
- `TSE_PREVIEW_USERNAME`
- `TSE_PREVIEW_PASSWORD`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` if it should differ by environment
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` if replacing verification setup
- `TSE_AMAZON_ASSOCIATE_TAG`

Checklist:

- confirm no secret values are committed in git history
- rotate any value that was ever pasted into shared chat, tickets, or screenshots
- create separate values for local, preview, staging, and production
- remove production secrets from preview/staging environments
- verify secrets are not printed in CI/CD logs
- verify redirects and protected APIs fail closed when required secrets are missing

