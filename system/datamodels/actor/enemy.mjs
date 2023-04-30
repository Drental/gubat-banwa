export default class EnemyTypeDataModel extends foundry.abstract.DataModel {
  /** @inheritDoc */
  static _enableV10Validation = true;

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      // Enemies don't have stats outside of violence

      // Violence related fields
      // Mechanical data
      style: new fields.StringField({ initial: "sentinel", choices: CONFIG.SYSTEM.STYLE_TYPES }),
      hp: new fields.SchemaField({
        max: new fields.NumberField({ min: 0, initial: 0, integer: true }),
        value: new fields.NumberField({ min: 0, initial: 0, integer: true }),
        block: new fields.NumberField({ min: 0, initial: 0, integer: true })
      }),
      abilities: new fields.SchemaField({
        bravery: new fields.SchemaField({
          value: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true })
        }),
        faith: new fields.SchemaField({
          value: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true })
        }),
        posture: new fields.SchemaField({
          value: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true })
        }),
        resistance: new fields.SchemaField({
          value: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true })
        }),
        speed: new fields.SchemaField({
          value: new fields.NumberField({ min: 3, max: 7, initial: 3, integer: true })
        })
      }),
      // Descriptive Data
      traits: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      violences: new fields.HTMLField({ required: false, blank: true, initial: "" }),
      gambits: new fields.HTMLField({ required: false, blank: true, initial: "" })
    };
  }
}
