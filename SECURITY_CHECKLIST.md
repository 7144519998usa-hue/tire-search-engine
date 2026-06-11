# Security Checklist

Use this checklist in the GitHub and Vercel dashboards after every security audit or credential change.

## GitHub

- Make the repository private unless there is a clear reason it must be public.
- Enable two-factor authentication for every account with repository access.
- Remove unknown collaborators.
- Review deploy keys and remove any key that is no longer needed.
- Review installed GitHub Apps and remove any app that is no longer needed.
- Protect the main production branch.
- Disable force pushes on protected branches.
- Disable branch deletion on protected branches.

## Vercel

- Review team members.
- Review project members.
- Enable deployment protection for preview deployments.
- Confirm environment variables are stored only in Vercel or local untracked `.env.local` files.
- Rotate any exposed or previously shared secrets.
- Confirm no secret has a `NEXT_PUBLIC_` prefix.
