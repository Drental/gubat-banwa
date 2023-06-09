import { SYSTEM_ID } from "../../CONSTANTS.mjs";
import ActorDocumentSheet from "./actor-config.mjs";

export default class EnemyConfig extends ActorDocumentSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "actor", "enemy"],
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = await super.getData();

    context.STYLE_TYPES = this.getOptionsList(CONFIG.SYSTEM.STYLE_TYPES);
    context.traitsHTML = await TextEditor.enrichHTML(this.object.system.traits, {
      async: true,
      secrets: this.object.isOwner
    });
    context.violencesHTML = await TextEditor.enrichHTML(this.object.system.violences, {
      async: true,
      secrets: this.object.isOwner
    });
    context.gambitsHTML = await TextEditor.enrichHTML(this.object.system.gambits, {
      async: true,
      secrets: this.object.isOwner
    });

    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find("a[data-action='roll-ability']").on("click", this._onRollAbility.bind(this));

    html.find('input[name="system.hp.value"]').on("input", (event) => this._onProgressValueInputChange(event));
    html.find("a.content-link").click(this._onClickContentLink.bind(this));
  }

  /* -------------------------------------------- */

  _onProgressValueInputChange(event) {
    const input = event.currentTarget;
    const value = parseInt(input.value);
    const max = parseInt(input.max);
    if (value > max) {
      input.value = max;
    }

    // Update progress bar
    const progress = input.closest("fieldset").querySelector("progress");
    progress.value = value;
  }

  /* -------------------------------------------- */

  /**
   * Handles opening a Content link
   * @param {Event} event
   * @returns {Promise<*>}
   * @private
   */
  async _onClickContentLink(event) {
    event.preventDefault();
    const doc = await fromUuid(event.currentTarget.dataset.uuid);
    return doc?._onClickDocumentLink(event);
  }

  /* -------------------------------------------- */

  /**
   * Cast the crocodile's Teeth.
   * @param {Event} event
   * @private
   */
  _onRollAbility(event) {
    const ability = event.target.closest("[data-name]").dataset.name;
    if (ability === "speed") {
      return;
    }
    new Dialog(
      {
        title: game.i18n.localize("GUBATBANWA.Cast.Violent"),
        content:
          '<div class="form-group"><label>Adjust Violence Cast die count: </label><input type="number" value="0" step="1" id="adjustment"></div><div class="form-group"><label>Adjust Violence Cast threshold: </label><input type="number" value="6" step="1" id="threshold"></div><div class="form-group"><label>Adjust Violence Cast critical threshold: </label><input type="number" value="10" step="1" id="critThreshold"></div>',
        buttons: {
          roll: {
            label: game.i18n.localize("GUBATBANWA.Cast.Label"),
            callback: async (html) => {
              const adjustment = Number(html.find("#adjustment")[0].value);
              const threshold = Number(html.find("#threshold")[0].value);
              const critThreshold = Number(html.find("#critThreshold")[0].value);
              this.document.system.abilities[ability].roll({ adjustment, threshold, critThreshold });
            },
            icon: '<i class="fa-solid fa-dice"></i>'
          }
        }
      },
      { width: 450 }
    ).render(true);
  }
}
