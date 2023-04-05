import { SYSTEM_ID } from "../CONSTANTS.mjs";

export default class GubatBanwaSheet extends DocumentSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet"],
      width: 520,
      height: 480,
      resizable: true,
      submitOnClose: true,
      submitOnChange: false,
      closeOnSubmit: true
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `${this.object.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find("img[data-edit='img']").click(this._onEditImage.bind(this));
  }

  /* -------------------------------------------- */

  async _onEditImage(event) {
    const attr = event.currentTarget.dataset.edit;
    const current = foundry.utils.getProperty(this.item, attr);
    const fp = new FilePicker({
      type: "image",
      current: current,
      callback: (path) => {
        event.currentTarget.src = path;
        if (this.options.submitOnChange) {
          this._onSubmit(event);
        }
      },
      top: this.position.top + 40,
      left: this.position.left + 10
    });
    return fp.browse();
  }

  /* -------------------------------------------- */

  async getForeignDocumentOptions(type, subtype, allowNone = true) {
    return this.constructor.getForeignDocumentOptions(type, subtype, allowNone);
  }

  /* -------------------------------------------- */

  static async getForeignDocumentOptions(type, subtype, allowNone = true) {
    const options = {};
    if (allowNone) options[""] = "None";
    let docs = game.collections.get(type).filter((d) => d.type === subtype);

    // / Iterate through the Packs, adding them to the list
    for (let pack of game.packs) {
      if (pack.metadata.type !== type) continue;
      const ids = pack.index.filter((d) => d.type === subtype).map((d) => d._id);
      for (const id of ids) {
        const doc = await pack.getDocument(id);
        if (doc) docs.push(doc);
      }
    }

    // Dedupe and sort the list alphabetically
    docs = Array.from(new Set(docs)).sort((a, b) => a.name.localeCompare(b.name));

    for (let d of docs) {
      options[d.id] = d.name;
    }
    return options;
  }

  /* -------------------------------------------- */

  /** Provides a slightly cleaner way of calling this for extending classes */
  getOptionsList(choices) {
    return this.constructor.getOptionsList(choices);
  }

  /* -------------------------------------------- */

  static getOptionsList(choices) {
    return Object.entries(choices).reduce((obj, [k, v]) => {
      obj[k] = game.i18n.localize(v.label);
      return obj;
    }, {});
  }
}
