!macro NSIS_HOOK_POSTINSTALL
  ${registerExtension} "$INSTDIR\Wallflower.exe" ".wlfr" "Wallflower.File"
!macroend