import {
  returnOrThrow,
  getWrapper,
  postWrapper,
  putWrapper,
  deleteWrapper,
  ADMIN_CUSTOMERS,
} from "./util";

export const adminCustomersList = async () => {
  const resJSON = await getWrapper(ADMIN_CUSTOMERS);
  return returnOrThrow(resJSON);
};

export const adminCustomerDetails = async (id) => {
  const resJSON = await getWrapper(`${ADMIN_CUSTOMERS}/${id}`);
  return returnOrThrow(resJSON);
};

export const adminCreateCustomer = async (data) => {
  const resJSON = await postWrapper(ADMIN_CUSTOMERS, data);
  return returnOrThrow(resJSON);
};

export const adminUpdateCustomer = async (id, data) => {
  const resJSON = await putWrapper(`${ADMIN_CUSTOMERS}/${id}`, data);
  return returnOrThrow(resJSON);
};

export const adminDeleteCustomer = async (id) => {
  const resJSON = await deleteWrapper(`${ADMIN_CUSTOMERS}/${id}`);
  return returnOrThrow(resJSON);
};
