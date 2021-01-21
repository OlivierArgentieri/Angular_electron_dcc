#!/bin/bash

# --- CP TO HOUDINI DIRECTORY ---
# path structure : ~/houdiniX.X/
read -p "Enter version of hodini (example: 18.0):" _houdiniVersion
_cpto=~"/houdini$_houdiniVersion"
echo $_cpto
