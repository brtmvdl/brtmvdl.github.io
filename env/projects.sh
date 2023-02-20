REPOS=$( curl -sSL 'https://api.github.com/users/brtmvdl/repos?limit=20&source=1' | jq '.[].full_name' | sed -e 's/"//ig' )

TEMPDIR="tmp"

mkdir -p "${TEMPDIR}" "projects/"

for REPO in $REPOS; do

  REPO_PATH="${TEMPDIR}/${REPO}"

  echo gh repo clone "${REPO}" "${REPO_PATH}"

  gh repo clone "${REPO}" "${REPO_PATH}"

done

for REPO in $( ls tmp/brtmvdl/ ); do

  REPO_PATH="${TEMPDIR}/${REPO}"

  mkdir -p "tmp/brtmvdl/${REPO}/src/github.io" "projects/${REPO}"

  echo cp -rfv "tmp/brtmvdl/${REPO}/src/github.io" "projects/${REPO}"

  [[ -f "tmp/brtmvdl/${REPO}/src/github.io/index.html" ]] && \
    cp -rfv "tmp/brtmvdl/${REPO}/src/github.io" "projects/${REPO}" && \
    echo OK

done
