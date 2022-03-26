#!/usr/bin/env sh

cat >>.git/hooks/pre-push <<EOF
# This is required somewhere in your script to accept user input from the keyboard.
exec < /dev/tty
trunk check --trigger=git-push
EOF
