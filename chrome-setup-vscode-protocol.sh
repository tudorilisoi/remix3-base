#!/bin/bash

# this allows chrome to open vscode:// URLS without prompt

# Define the policy path and filename
POLICY_DIR="/etc/opt/chrome/policies/managed"
POLICY_FILE="$POLICY_DIR/external_protocols.json"

# Require sudo
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo"
  exit 1
fi

# Create the policy directory if it doesn't exist
mkdir -p "$POLICY_DIR"

# Write the policy JSON
cat > "$POLICY_FILE" <<EOF
{
  "URLAllowlist": ["vscode://*"],
  "ExternalProtocolDialogShowAlwaysOpenCheckbox": true
}
EOF

# Set appropriate permissions
chmod 644 "$POLICY_FILE"

echo "Policy installed at $POLICY_FILE"
echo "Restart Chrome and visit chrome://policy to verify."

