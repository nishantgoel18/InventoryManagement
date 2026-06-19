import {
  returnOrThrow,
  getWrapper,
  postWrapper,
  putWrapper,
  deleteWrapper,
  ADMIN_ORDERS,
} from "./util";

export const adminOrdersList = async () => {
  const resJSON = await getWrapper(ADMIN_ORDERS);
  return returnOrThrow(resJSON);
};

export const adminOrderDetails = async (id) => {
  const resJSON = await getWrapper(`${ADMIN_ORDERS}/${id}`);
  return returnOrThrow(resJSON);
};

export const adminCreateOrder = async (data) => {
  const resJSON = await postWrapper(ADMIN_ORDERS, data);
  return returnOrThrow(resJSON);
};

export const adminUpdateOrderStatus = async (id, status) => {
  const resJSON = await putWrapper(`${ADMIN_ORDERS}/${id}/status`, { status });
  return returnOrThrow(resJSON);
};

export const adminDeleteOrder = async (id) => {
  const resJSON = await deleteWrapper(`${ADMIN_ORDERS}/${id}`);
  return returnOrThrow(resJSON);
};
