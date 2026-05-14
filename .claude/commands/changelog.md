Update CHANGELOG.md with any commits that are not yet reflected in it.

Steps:
1. Read CHANGELOG.md. Find the most recent date heading (format: `## YYYY-MM-DD`). If the file is empty or has no date headings, treat the cutoff as the beginning of git history.
2. Run `git log --pretty=format:"%ad %s" --date=short` to get all commits with their dates.
3. Filter to commits dated after the most recent date heading (or all commits if there was none).
4. Group the filtered commits by date (newest date first).
5. For each date group, synthesize the commits into clear, human-readable bullet points that describe what changed — do not copy raw commit messages verbatim; rewrite them as changelog entries a reader would find useful. Each bullet should start with a capital letter and describe the change from the user's perspective.
6. Prepend the new date sections (each as `## YYYY-MM-DD` followed by bullets) above the existing content in CHANGELOG.md.
7. If there are no new commits since the last entry, say so and make no changes.

Write the result back to CHANGELOG.md using the Write or Edit tool. Do not add a preamble or ask for confirmation — just do it and report what was added.
