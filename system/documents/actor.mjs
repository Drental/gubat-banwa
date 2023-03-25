/**
 * Extend the basic ActorSheet with some shared behaviors
 */
export default class GubatBanwaActor extends Actor {
  /**
   * Is this Actor currently in the active Combat encounter?
   * @type {boolean}
   */
  get inCombat() {
    if (this.isToken) return !!game.combat?.combatants.find((c) => c.tokenId === this.token.id);
    return !!game.combat?.combatants.find((c) => c.actorId === this.id);
  }

  /* -------------------------------------------- */

  prepareDerivedData() {
    switch (this.type) {
      case "kadungganan":
        return this._prepareKadungagananDerivedData();
    }
  }

  /* -------------------------------------------- */

  async loadForeignDocuments() {
    async function getForeignDocuments(type, subtype) {
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
      const collection = new Collection();
      for (let d of docs) {
        collection.set(d.id, d);
      }
      return collection;
    }

    CONFIG.SYSTEM.DISCIPLINE_DOCUMENTS = await getForeignDocuments("Item", "discipline");
    CONFIG.SYSTEM.TECHNIQUE_DOCUMENTS = await getForeignDocuments("Item", "technique");
    CONFIG.SYSTEM.ANTINGANTING_DOCUMENTS = await getForeignDocuments("Item", "antingAnting");
  }

  /* -------------------------------------------- */

  async _prepareKadungagananDerivedData() {
    console.log("Gubat Banwa | Preparing PC Derived Data");

    this.prepareArc();
    await this.prepareForeignDocumentData();
    this.prepareAlignment();
    this.prepareAbility();
  }

  /* -------------------------------------------- */

  prepareAlignment() {
    for (const alignmentKey of Object.keys(this.system.alignments)) {
      const alignment = this.system.alignments[alignmentKey];
      alignment.name = `${game.i18n.localize(
        `GUBATBANWA.Alignments.${alignmentKey.charAt(0).toUpperCase() + alignmentKey.slice(1)}`
      )}`;
      alignment.roll = async ({ moxie, adjustment }) => {
        const teeth = alignment.value + adjustment;
        const result = await new Roll(
          `${teeth}d10cs>=6[${alignment.name}] - ${moxie}d8cs>=6[${game.i18n.localize("GUBATBANWA.Moxie.Label")}]`
        ).evaluate();
        result._total = result._total + result.terms[0].results.filter((r) => r.result === 10).length;
        for (const die of result.terms[0].results.filter((r) => r.result === 10)) {
          die.count = 2;
        }
        await result.toMessage({
          flavor: "Casting the Crocodile's Teeth:"
        });
      };
    }
  }

  /* -------------------------------------------- */

  prepareAbility() {
    for (const abilityKey of Object.keys(this.system.abilities)) {
      const ability = this.system.abilities[abilityKey];
      ability.name = `${game.i18n.localize(
        `GUBATBANWA.Abilities.${abilityKey.charAt(0).toUpperCase() + abilityKey.slice(1)}`
      )}`;
      ability.roll = async ({ adjustment, threshold, critThreshold }) => {
        threshold = threshold ? threshold : 6;
        critThreshold = critThreshold ? critThreshold : 10;
        const teeth = ability.value + adjustment;
        const teethSize = ["bravery", "faith"].includes(abilityKey) ? 10 : 8;
        const result = await new Roll(`${teeth}d${teethSize}cs>=${threshold}[${ability.name}]`).evaluate();
        result._total = result._total + result.terms[0].results.filter((r) => r.result >= critThreshold).length;
        for (const die of result.terms[0].results.filter((r) => r.result >= critThreshold)) {
          die.count = 2;
        }
        await result.toMessage({
          flavor: "Violence Cast:"
        });
      };
    }
  }

  /* -------------------------------------------- */

  prepareArc() {
    this.system.arc = Math.floor(this.system.legend / 3) + 1;
  }

  /* -------------------------------------------- */

  async prepareForeignDocumentData() {
    if (CONFIG.SYSTEM.DISCIPLINE_DOCUMENTS.size === 0) {
      await this.loadForeignDocuments();
    }
    this.system.disciplineId = this._source.system.discipline;
    this.system.discipline = CONFIG.SYSTEM.DISCIPLINE_DOCUMENTS.get(this._source.system.discipline);

    this.system.hp.max = this.system.discipline?.system?.hp;
  }
}
