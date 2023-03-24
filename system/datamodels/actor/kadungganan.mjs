import GubatBanwaItem from "../../documents/item.mjs";

export default class KadunggananTypeDataModel extends foundry.abstract.DataModel {
  /** @inheritDoc */
  static _enableV10Validation = true;

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      // progression and character choices
      legend: new fields.NumberField({ min: 0, initial: 0, max: 8, integer: true }),
      thunderboltTokens: new fields.NumberField({ min: 0, initial: 1, integer: true }),
      crown: new fields.StringField({ initial: "fire", choices: CONFIG.SYSTEM.ALIGNMENT_TYPES }),
      mask: new fields.StringField({ initial: "fire", choices: CONFIG.SYSTEM.ALIGNMENT_TYPES }),
      sword: new fields.StringField({ initial: "fire", choices: CONFIG.SYSTEM.ALIGNMENT_TYPES }),

      // War Drama related fields
      // Fields with Mechanical importance
      alignments: new fields.SchemaField({
        fire: new fields.NumberField({ min: 2, max: 6, initial: 2, integer: true }),
        water: new fields.NumberField({ min: 2, max: 6, initial: 2, integer: true }),
        metal: new fields.NumberField({ min: 2, max: 6, initial: 2, integer: true }),
        air: new fields.NumberField({ min: 2, max: 6, initial: 2, integer: true }),
        earth: new fields.NumberField({ min: 2, max: 6, initial: 2, integer: true })
      }),
      honor: new fields.NumberField({ min: -1, initial: 1, max: 8, integer: true }),
      // Character background and descriptions
      pronouns: new fields.StringField({ blank: true, initial: "" }),
      folk: new fields.StringField({ blank: true, initial: "" }),
      culture: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      subculture: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      lineage: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      socialStanding: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      conviction: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      conjecture: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      complications: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      debts: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      items: new fields.HTMLField({ required: false, blank: true, initial: "" }),

      // Violence related fields
      // Mechanical data
      hp: new fields.SchemaField({
        max: new fields.NumberField({ min: 0, initial: 0, integer: true }),
        current: new fields.NumberField({ initial: 0, integer: true }),
        block: new fields.NumberField({ min: 0, initial: 0, integer: true })
      }),
      abilities: new fields.SchemaField({
        bravery: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true }),
        faith: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true }),
        posture: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true }),
        resistance: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true }),
        speed: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true })
      }),
      discipline: new fields.ForeignDocumentField(GubatBanwaItem, {
        required: false,
        type: "discipline",
        idOnly: true
      }),
      techniques: new fields.SetField(
        new fields.ForeignDocumentField(GubatBanwaItem, { required: true, type: "technique", idOnly: true })
      ),
      antingAnting: new fields.SetField(
        new fields.ForeignDocumentField(GubatBanwaItem, { required: true, type: "antingAnting", idOnly: true })
      ),
      consumables: new fields.SetField(
        new fields.ForeignDocumentField(GubatBanwaItem, { required: true, type: "consumable", idOnly: true })
      ),
      // Descriptive Data
      weapon: new fields.StringField({ blank: true, initial: "" }),
      armor: new fields.StringField({ blank: true, initial: "" })
    };
  }
}
