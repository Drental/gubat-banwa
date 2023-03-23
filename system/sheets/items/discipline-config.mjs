import { SYSTEM_ID } from "../../CONSTANTS.mjs";
import ItemDocumentSheet from "./item-config.mjs";

export default class DisciplineConfig extends ItemDocumentSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "item", "discipline"],
      width: 725,
      height: 650
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = super.getData();
    context.STYLE_TYPES = this.getOptionsList(CONFIG.SYSTEM.STYLE_TYPES);
    context.violencesHTML = await TextEditor.enrichHTML(this.object.system.violences, {
      async: true,
      secrets: this.object.isOwner
    });
    context.traitsHTML = await TextEditor.enrichHTML(this.object.system.traits, {
      async: true,
      secrets: this.object.isOwner
    });
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
