!macro NSIS_HOOK_POSTINSTALL
  ${registerExtension} "$INSTDIR\Clara.exe" ".wlfr" "Clara.File"
!macroend