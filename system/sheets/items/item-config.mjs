import {SYSTEM_ID} from "../../CONSTANTS.mjs";
import GubatBanwaSheet from "../gubat-banwa-sheet.mjs";

export default class ItemDocumentSheet extends GubatBanwaSheet {

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "item"],
      width: 520,
      height: 480
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get template() {
    return `systems/${SYSTEM_ID}/system/templates/items/${this.object.type}-config.hbs`;
  }
}
