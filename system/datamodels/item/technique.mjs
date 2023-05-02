import GubatBanwaItem from "../../documents/item.mjs";

export default class TechniqueTypeDataModel extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static _enableV10Validation = true;

  // TODO: This was just an example shim done on stream. It's not complete.

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField({ required: false, nullable: false }),
      discipline: new fields.ForeignDocumentField(GubatBanwaItem, {
        required: false,
        type: "discipline",
        idOnly: true
      })
    };
  }
}
