import { SYSTEM_ID } from "./CONSTANTS.mjs";
import { init } from "./hooks/init.mjs";
import { itemCreate, itemUpdate, itemDelete } from "./hooks/itemCRUD.mjs";

Hooks.once("init", init);
Hooks.on("devModeReady", ({ registerPackageDebugFlag }) => registerPackageDebugFlag(SYSTEM_ID));
Hooks.on("createItem", itemCreate);
Hooks.on("updateItem", itemUpdate);
Hooks.on("deleteItem", itemDelete);
