import { SYSTEM, SYSTEM_ID, SYSTEM_NAME } from "../CONSTANTS.mjs";
import GubatBanwaActor from "../documents/actor.mjs";
import KadunggananTypeDataModel from "../datamodels/actor/kadungganan.mjs";
import EnemyTypeDataModel from "../datamodels/actor/enemy.mjs";
import KadunggananConfig from "../sheets/actors/kadungganan-config.mjs";
import EnemyConfig from "../sheets/actors/enemy-config.mjs";
import GubatBanwaItem from "../documents/item.mjs";
import DisciplineConfig from "../sheets/items/discipline-config.mjs";
import DisciplineTypeDataModel from "../datamodels/item/discipline.mjs";
import TechniqueConfig from "../sheets/items/technique-config.mjs";
import TechniqueTypeDataModel from "../datamodels/item/technique.mjs";
import AntingAntingConfig from "../sheets/items/antingAnting-config.mjs";
import AntingAntingTypeDataModel from "../datamodels/item/antingAnting.mjs";

export function init() {
  console.log(`${SYSTEM_NAME} | Initializing  System`);

  CONFIG.SYSTEM = SYSTEM;

  registerDataModels();
  registerDocumentSheets();
  registerDocumentClasses();
}

/* -------------------------------------------- */

function registerDataModels() {
  CONFIG.Actor.dataModels = {
    kadungganan: KadunggananTypeDataModel,
    enemy: EnemyTypeDataModel
  };

  CONFIG.Item.dataModels = {
    discipline: DisciplineTypeDataModel,
    technique: TechniqueTypeDataModel,
    antingAnting: AntingAntingTypeDataModel
  };
}

/* -------------------------------------------- */

function registerDocumentClasses() {
  CONFIG.Actor.documentClass = GubatBanwaActor;
  CONFIG.Item.documentClass = GubatBanwaItem;
}

/* -------------------------------------------- */

function registerDocumentSheets() {
  if (!CONFIG.SYSTEM.isDebugging()) {
    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);
  }

  // Actors
  Actors.registerSheet(SYSTEM_ID, KadunggananConfig, { types: ["kadungganan"], makeDefault: true });
  Actors.registerSheet(SYSTEM_ID, EnemyConfig, { types: ["enemy"], makeDefault: true });

  // Items
  Items.registerSheet(SYSTEM_ID, DisciplineConfig, { types: ["discipline"], makeDefault: true });
  Items.registerSheet(SYSTEM_ID, TechniqueConfig, { types: ["technique"], makeDefault: true });
  Items.registerSheet(SYSTEM_ID, AntingAntingConfig, { types: ["antingAnting"], makeDefault: true });
}
