export const SYSTEM_ID = "gubat-banwa";
export const SYSTEM_NAME = "Gubat Banwa";

function isDebugging() {
  return game.modules.get("_dev-mode")?.api?.getPackageDebugValue(SYSTEM_ID);
}

function log(...args) {
  if (isDebugging()) console.log(`${SYSTEM_NAME} |`, ...args);
}

/**
 * The supported alignment types.
 * @type {{label: string}}
 */
const ALIGNMENT_TYPES = {
  fire: { label: "Fire" },
  water: { label: "Water" },
  metal: { label: "Metal" },
  air: { label: "Air" },
  earth: { label: "Earth" }
};

/**
 * The supported style types.
 * @type {{label: string}}
 */
const STYLE_TYPES = {
  sentinel: { label: "Sentinel" },
  raider: { label: "Raider" },
  sharpshooter: { label: "Sharpshooter" },
  witch: { label: "Witch" },
  medium: { label: "Medium" }
};

export const SYSTEM = {
  id: SYSTEM_ID,
  name: SYSTEM_NAME,
  log,
  isDebugging,
  ALIGNMENT_TYPES,
  STYLE_TYPES,
  DISCIPLINE_DOCUMENTS: new Collection(),
  TECHNIQUE_DOCUMENTS: new Collection(),
  ANTINGANTING_DOCUMENTS: new Collection()
};
