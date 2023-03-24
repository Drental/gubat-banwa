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
