export function setup() {
  // Forced panning is intrinsically annoying: change default to false
  game.settings.settings.get("core.chatBubblesPan").default = false;
  // Improve discoverability of map notes
  game.settings.settings.get("core.notesDisplayToggle").default = true;
  // Set Always as defaults for Default Token Configuration
  const defaultTokenSettingsDefaults = game.settings.settings.get("core.defaultToken").default;
  defaultTokenSettingsDefaults.displayName = CONST.TOKEN_DISPLAY_MODES.ALWAYS;
  defaultTokenSettingsDefaults.displayBars = CONST.TOKEN_DISPLAY_MODES.ALWAYS;
}
