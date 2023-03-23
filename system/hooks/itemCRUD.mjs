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
    if (deleted) CONFIG.SYSTEM.Discipline_DOCUMENTS.delete(itemData._id);
    else CONFIG.SYSTEM.Discipline_DOCUMENTS.set(itemData._id, itemData);
  }
  if (itemData.type === "technique") {
    if (deleted) CONFIG.SYSTEM.Technique_DOCUMENTS.delete(itemData._id);
    else CONFIG.SYSTEM.Technique_DOCUMENTS.set(itemData._id, itemData);
  }
  if (itemData.type === "antingAnting") {
    if (deleted) CONFIG.SYSTEM.AntingAnting_DOCUMENTS.delete(itemData._id);
    else CONFIG.SYSTEM.AntingAnting_DOCUMENTS.set(itemData._id, itemData);
  }
}
