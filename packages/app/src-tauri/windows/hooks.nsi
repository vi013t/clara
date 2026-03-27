!macro NSIS_HOOK_POSTINSTALL
  ${registerExtension} "$INSTDIR\Clara.exe" ".clara" "Clara.File"
!macroend