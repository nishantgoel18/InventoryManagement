import { returnOrThrow, getWrapper, putWrapper, ADMIN_INVENTORY } from "./util";

export const adminInventoryList = async () => {
  const resJSON = await getWrapper(ADMIN_INVENTORY);
  return returnOrThrow(resJSON);
};

export const adminInventoryDetails = async (id) => {
  const resJSON = await getWrapper(`${ADMIN_INVENTORY}/${id}`);
  return returnOrThrow(resJSON);
};

export const adminLowStockList = async () => {
  const resJSON = await getWrapper(`${ADMIN_INVENTORY}/low-stock`);
  return returnOrThrow(resJSON);
};

export const adminUpdateInventory = async (id, data) => {
  const resJSON = await putWrapper(`${ADMIN_INVENTORY}/${id}`, data);
  return returnOrThrow(resJSON);
};
