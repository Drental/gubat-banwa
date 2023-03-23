import { SYSTEM_ID } from "../../CONSTANTS.mjs";
import ItemDocumentSheet from "./item-config.mjs";

export default class AntingAntingConfig extends ItemDocumentSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "item", "technique"],
      width: 650,
      height: 400
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();
    context.descriptionHTML = await TextEditor.enrichHTML(this.object.system.description, {
      async: true,
      secrets: this.object.isOwner
    });
    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  }
}
