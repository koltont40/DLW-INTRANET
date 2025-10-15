#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR=${1:-/opt/dlw-intranet}
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

print_step() {
  printf '\n==> %s\n' "$1"
}

if [[ ! -d "${SRC_DIR}/assets" || ! -f "${SRC_DIR}/index.html" ]]; then
  echo "Error: install.sh must be executed from within the repository directory structure." >&2
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
    mkdir -p "${destination}"
    cp -R "${SRC_DIR}/assets" "${destination}/"
    cp "${SRC_DIR}/index.html" "${SRC_DIR}/README.md" "${destination}/"
  fi
}

print_step "Creating target directory at ${TARGET_DIR}"
mkdir -p "${TARGET_DIR}"

print_step "Copying intranet assets"
sync_payload "${TARGET_DIR}"

if [[ ! -f "${TARGET_DIR}/config.env" ]]; then
  print_step "Generating config.env template"
  cat <<'EOCONFIG' > "${TARGET_DIR}/config.env"
# Environment configuration for Dixieland Wireless Intranet
# Define URLs for external services to avoid editing HTML directly.
TECH_INSTALL_PORTAL_URL="https://example.com/tech-install"
SERVICE_DESK_URL="https://example.com/service-desk"
EOCONFIG
fi

cat <<EONOTE

Installation complete!

Next steps:
  * Update ${TARGET_DIR}/config.env with production URLs.
  * Serve the intranet directory through your preferred web server or by running python3 -m http.server for local testing.
EONOTE
