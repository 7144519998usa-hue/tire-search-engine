# Branch Protection Recommendation

Recommended protection for the production branch:

- Require pull request review before merging.
- Require status checks to pass before merging.
- Require the production build check before merging.
- Require security scan checks before merging once configured.
- Require branches to be up to date before merging.
- Disable force pushes.
- Disable branch deletion.
- Restrict who can push directly to the production branch.
- Require conversation resolution before merging pull requests.
- Require signed commits if the team can support it consistently.
