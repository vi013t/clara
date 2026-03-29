# main application install
Section "Main App" SEC_MAIN
  SetOutPath "$INSTDIR"
  File /r "${APP_BINARY_SOURCE}\*"
SectionEnd

# "install CLI" checkbox
Section "Install CLI Tool" SEC_CLI
  SetOutPath "$INSTDIR"
  File "${APP_RESOURCES_DIR}\clara.exe"
  EnVar::AddValue "Path" "$INSTDIR"
SectionEnd

# descriptions that show up when hovering over the checkbox
!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${SEC_MAIN} "The core application."
  !insertmacro MUI_DESCRIPTION_TEXT ${SEC_CLI} "Adds 'clara-cli' to your terminal PATH."
!insertmacro MUI_FUNCTION_DESCRIPTION_END