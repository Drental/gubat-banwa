import { SYSTEM_ID } from "../../CONSTANTS.mjs";
import ActorDocumentSheet from "./actor-config.mjs";

export default class KadunggananConfig extends ActorDocumentSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: [SYSTEM_ID, "sheet", "actor", "kadungganan"],
      tabs: [{ navSelector: ".tabs", contentSelector: ".tabs-container", initial: "war-drama" }],
      // infoTabs: [{ navSelector: ".info-tabs", contentSelector: ".info-tabs-container", initial: "culture" }],
      closeOnSubmit: false,
      submitOnChange: true,
      submitOnClose: true
    });
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const context = await super.getData();
    context.DISCIPLINE_TYPES = await this.getForeignDocumentOptions("Item", "discipline");
    context.TECHNIQUE_TYPES = await this.getForeignDocumentOptions("Item", "technique");
    context.ANTINGANTING_TYPES = await this.getForeignDocumentOptions("Item", "antingAnting");
    context.ALIGNMENT_TYPES = this.getOptionsList(CONFIG.SYSTEM.ALIGNMENT_TYPES);

    context.cultureHTML = await TextEditor.enrichHTML(this.object.system.culture, {
      async: true,
      secrets: this.object.isOwner
    });
    context.subcultureHTML = await TextEditor.enrichHTML(this.object.system.subculture, {
      async: true,
      secrets: this.object.isOwner
    });
    context.lineageHTML = await TextEditor.enrichHTML(this.object.system.lineage, {
      async: true,
      secrets: this.object.isOwner
    });
    context.socialStandingHTML = await TextEditor.enrichHTML(this.object.system.socialStanding, {
      async: true,
      secrets: this.object.isOwner
    });
    context.convictionHTML = await TextEditor.enrichHTML(this.object.system.conviction, {
      async: true,
      secrets: this.object.isOwner
    });
    context.conjectureHTML = await TextEditor.enrichHTML(this.object.system.conjecture, {
      async: true,
      secrets: this.object.isOwner
    });
    context.debtsHTML = await TextEditor.enrichHTML(this.object.system.debts, {
      async: true,
      secrets: this.object.isOwner
    });
    context.complicationsHTML = await TextEditor.enrichHTML(this.object.system.complications, {
      async: true,
      secrets: this.object.isOwner
    });
    context.itemsHTML = await TextEditor.enrichHTML(this.object.system.items, {
      async: true,
      secrets: this.object.isOwner
    });
    context.traitsHTML = await TextEditor.enrichHTML(this.object.system.discipline?.system?.traits, {
      async: true,
      secrets: this.object.isOwner
    });
    context.violencesHTML = await TextEditor.enrichHTML(this.object.system.discipline?.system?.violences, {
      async: true,
      secrets: this.object.isOwner
    });
    return context;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find("a[data-action='roll-alignment']").on("click", this._onRollAlignment.bind(this));
    html.find("a[data-action='roll-ability']").on("click", this._onRollAbility.bind(this));

    html.find('[data-action="delete"]').click(this._onDeleteDatasetItem.bind(this));
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
  _onRollAlignment(event) {
    const expandRoll = foundry.utils.debounce((result) => {
      const message = document.querySelector(`[data-message-id="${result.id}"] .dice-tooltip`);
      message.classList.add("expanded");
      message.scrollIntoView();
    }, 50);

    new Dialog(
      {
        title: game.i18n.localize("GUBATBANWA.Cast.CrocodilesTeeth"),
        content: `<select id="moxie">
          ${[0, 1, 2, 3].map((j) => `<option value="${j}">+${j}d</option>`).join("")}
        </select>`,
        buttons: {
          roll: {
            label: game.i18n.localize("GUBATBANWA.Moxie.Daring"),
            callback: async (html) => {
              const alignment = event.target.closest("[data-name]").dataset.name;
              const alignmentTeeth = this.document.system.alignments[alignment];
              const teeth = alignmentTeeth + Number(html.find("#moxie")[0].value);
              const result = await new Roll(
                `${teeth}d10cs>=6[${game.i18n.localize(
                  `GUBATBANWA.Alignments.${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`
                )}] - 3d8cs>=6[${game.i18n.localize("GUBATBANWA.Moxie.Label")}]`
              ).toMessage({
                flavor: "Casting the Crocodile's Teeth:"
              });
              expandRoll(result);
            },
            icon: '<i class="fa-solid fa-dice"></i>'
          },
          pointBuy: {
            label: game.i18n.localize("GUBATBANWA.Moxie.Hesitant"),
            callback: async (html) => {
              const alignment = event.target.closest("[data-name]").dataset.name;
              const alignmentTeeth = this.document.system.alignments[alignment];
              const teeth = alignmentTeeth + Number(html.find("#moxie")[0].value);
              const result = await new Roll(
                `${teeth}d10cs>=6[${game.i18n.localize(
                  `GUBATBANWA.Alignments.${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`
                )}] - 4d8cs>=6[${game.i18n.localize("GUBATBANWA.Moxie.Label")}]`
              ).toMessage({
                flavor: "Casting the Crocodile's Teeth:"
              });
              expandRoll(result);
            },
            icon: '<i class="fa-solid fa-dice"></i>'
          },
          standard: {
            label: game.i18n.localize("GUBATBANWA.Moxie.Confident"),
            callback: async (html) => {
              const alignment = event.target.closest("[data-name]").dataset.name;
              const alignmentTeeth = this.document.system.alignments[alignment];
              const teeth = alignmentTeeth + Number(html.find("#moxie")[0].value);
              const result = await new Roll(
                `${teeth}d10cs>=6[${game.i18n.localize(
                  `GUBATBANWA.Alignments.${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`
                )}] - 2d8cs>=6[${game.i18n.localize("GUBATBANWA.Moxie.Label")}]`
              ).toMessage({
                flavor: "Casting the Crocodile's Teeth:"
              });
              expandRoll(result);
            },
            icon: '<i class="fa-solid fa-dice"></i>'
          }
        }
      },
      { width: 450 }
    ).render(true);
  }

  /* -------------------------------------------- */

  /**
   * Cast the crocodile's Teeth.
   * @param {Event} event
   * @private
   */
  _onRollAbility(event) {
    const expandRoll = foundry.utils.debounce((result) => {
      const message = document.querySelector(`[data-message-id="${result.id}"] .dice-tooltip`);
      message.classList.add("expanded");
      message.scrollIntoView();
    }, 50);
    const ability = event.target.closest("[data-name]").dataset.name;
    if (ability === "speed") {
      return;
    }
    new Dialog(
      {
        title: game.i18n.localize("GUBATBANWA.Cast.Violent"),
        content:
          '<label>Adjust Violence Cast die count: </label><input type="number" value="0" step="1" id="adjustment">',
        buttons: {
          roll: {
            label: game.i18n.localize("GUBATBANWA.Cast.Label"),
            callback: async (html) => {
              const abilityTeeth = this.document.system.abilities[ability];
              const teeth = abilityTeeth + Number(html.find("#adjustment")[0].value);
              const teethSize = ["bravery", "faith"].includes(ability) ? 10 : 8;
              const result = await new Roll(
                `${teeth}d${teethSize}cs>=6[${game.i18n.localize(
                  `GUBATBANWA.Abilities.${ability.charAt(0).toUpperCase() + ability.slice(1)}`
                )}]`
              ).toMessage({
                flavor: "Violence Cast:"
              });
              expandRoll(result);
            },
            icon: '<i class="fa-solid fa-dice"></i>'
          }
        }
      },
      { width: 450 }
    ).render(true);
  }
}
