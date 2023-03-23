import { SYSTEM_ID } from "../../CONSTANTS.mjs";
import GubatBanwaSheet from "../gubat-banwa-sheet.mjs";

export default class ActorDocumentSheet extends GubatBanwaSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "actor"],
      width: 800,
      height: 800
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get template() {
    return `systems/${SYSTEM_ID}/system/templates/actors/${this.object.type}-config.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();
    return context;
  }
}
