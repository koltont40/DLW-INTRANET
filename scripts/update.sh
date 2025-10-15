#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR=${1:-/opt/dlw-intranet}
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

print_step() {
  printf '\n==> %s\n' "$1"
}

if [[ ! -d "${SRC_DIR}/assets" || ! -f "${SRC_DIR}/index.html" ]]; then
  echo "Error: update.sh must be executed from within the repository directory structure." >&2
  exit 1
fi

if [[ ! -d "${TARGET_DIR}" ]]; then
  cat <<EOMSG >&2
Error: ${TARGET_DIR} does not exist.
Run scripts/install.sh first to create a baseline deployment.
EOMSG
  exit 1
fi

sync_payload() {
  local destination="$1"

  if command -v rsync >/dev/null 2>&1; then
    rsync -a \
      "${SRC_DIR}/assets" \
      "${SRC_DIR}/index.html" \
      "${SRC_DIR}/README.md" \
      "${destination}/"
  else
    rm -rf "${destination}/assets"
    cp -R "${SRC_DIR}/assets" "${destination}/"
    cp "${SRC_DIR}/index.html" "${SRC_DIR}/README.md" "${destination}/"
  fi
}

print_step "Applying update to ${TARGET_DIR}"
sync_payload "${TARGET_DIR}"

cat <<'EONOTE'

Update complete!
Existing configuration files (such as config.env) were preserved.
Restart or reload your web server if required to pick up the latest assets.
EONOTE
