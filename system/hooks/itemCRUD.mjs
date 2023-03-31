export function itemCreate(itemData, options, userId) {
  updateItem(itemData);
}

export function itemUpdate(itemData, options, userId) {
  updateItem(itemData);
}

export function itemDelete(itemData, options, userId) {
  updateItem(itemData, true);
}

function updateItem(itemData, deleted = false) {
  if (itemData.type === "discipline") {
    if (deleted) CONFIG.SYSTEM.DISCIPLINE_DOCUMENTS.delete(itemData._id);
    else CONFIG.SYSTEM.DISCIPLINE_DOCUMENTS.set(itemData._id, itemData);
  }
  if (itemData.type === "technique") {
    if (deleted) CONFIG.SYSTEM.TECHNIQUE_DOCUMENTS.delete(itemData._id);
    else CONFIG.SYSTEM.TECHNIQUE_DOCUMENTS.set(itemData._id, itemData);
  }
  if (itemData.type === "antingAnting") {
    if (deleted) CONFIG.SYSTEM.ANTINGANTING_DOCUMENTS.delete(itemData._id);
    else CONFIG.SYSTEM.ANTINGANTING_DOCUMENTS.set(itemData._id, itemData);
  }
}
