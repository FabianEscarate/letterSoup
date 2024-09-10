#!/bin/bash

echo "Verify PR Title for make package version"
pr_title="$env."

echo "Title of pr $pr_title"

if [[ "$pr_title" =~ ^\[major\].?+$ ]]; then
  echo "has major in title, generate a major version"
  exit 0
fi

if [[ "$pr_title" =~ ^\[minor\].?+$ ]]; then
  echo "has minor in title, generate a minor version"
  exit 0
fi

if [[ "$pr_title" =~ ^\[patch\].?+$ ]]; then
  echo "has patch in title, generate a patch version"
  exit 0
fi

echo "::error title={Error Script}::Error, PR Title must be start with [patch], [minor] or [major]"
exit 1