#!/bin/bash

echo "Verify PR Title for make package version"
pr_title="$pr_title"

echo "Title of pr $pr_title"

if [[ "$pr_title" =~ ^\[major\].?+$ ]]; then
  echo "has major in title, generate a major version"
  echo "npm_version_flag=major" >> "$GITHUB_OUTPUT"
  exit 0
fi

if [[ "$pr_title" =~ ^\[minor\].?+$ ]]; then
  echo "has minor in title, generate a minor version"
  echo "npm_version_flag=minor" >> "$GITHUB_OUTPUT"
  exit 0
fi

if [[ "$pr_title" =~ ^\[patch\].?+$ ]]; then
  echo "has patch in title, generate a patch version"
  echo "npm_version_flag=patch" >> "$GITHUB_OUTPUT"
  exit 0
fi

echo "::error title=Error Script::Error, PR Title must be start with [patch], [minor] or [major]"
exit 1