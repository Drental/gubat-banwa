import GubatBanwaItem from "../../documents/item.mjs";

export default class DisciplineTypeDataModel extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static _enableV10Validation = true;

  // TODO: This was just an example shim done on stream. It's not complete.

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField({ required: false, nullable: false }),
      style: new fields.StringField({ initial: "sentinel", choices: CONFIG.SYSTEM.STYLE_TYPES }),
      violences: new fields.HTMLField({ required: false, nullable: false }),
      traits: new fields.HTMLField({ required: false, nullable: false }),
      techniques: new fields.SetField(
        new fields.ForeignDocumentField(GubatBanwaItem, { required: true, type: "technique", idOnly: true })
      ),
      hp: new fields.NumberField({ min: 0, initial: 16, integer: true }),
      weapon: new fields.StringField({}),
      armor: new fields.StringField({})
    };
  }
}
