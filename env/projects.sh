REPOS=$( curl -sSL 'https://api.github.com/users/brtmvdl/repos?per_page=1&source=1' | jq '.[].full_name' | sed -e 's/"//ig' )

echo REPOS: $REPOS

TEMPDIR="tmp"

mkdir -p "${TEMPDIR}" "projects/"

for REPO in $REPOS; do

  REPO_PATH="${TEMPDIR}/${REPO}"

  echo gh repo clone "${REPO}" "${REPO_PATH}"

  gh repo clone "${REPO}" "${REPO_PATH}"

done

for REPO in $REPOS; do

  echo mkdir -p "projects/${REPO}"

  mkdir -p "projects/${REPO}"

  echo mkdir -p "${TEMPDIR}/brtmvdl/${REPO}/src/github.io/*" "projects/${REPO}"

  mkdir -p "${TEMPDIR}/brtmvdl/${REPO}/src/github.io/*" "projects/${REPO}"

done
