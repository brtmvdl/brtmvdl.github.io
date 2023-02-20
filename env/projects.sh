REPOS=$( curl -sSL 'https://api.github.com/users/brtmvdl/repos?limit=200&source=1' | jq '.[].full_name' | sed -e 's/"//ig' )

GITHUB_WORKSPACE="tmp"

rm -rf "${GITHUB_WORKSPACE}" "projects/"

mkdir -p "${GITHUB_WORKSPACE}" "projects/"

for REPO in $REPOS; do

  REPO_PATH="${GITHUB_WORKSPACE}/${REPO}"

  echo
  echo
  echo REPO_PATH: "${REPO_PATH}"
  echo
  echo

  echo gh repo clone "${REPO}" "${REPO_PATH}"

  gh repo clone "${REPO}" "${REPO_PATH}"

  echo cp -rfv "tmp/brtmvdl/${REPO}/src/github.io" "projects/${REPO}"

  cp -rfv "tmp/brtmvdl/${REPO}/src/github.io" "projects/${REPO}" > /dev/zero

done
