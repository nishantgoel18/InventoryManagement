import {
  returnOrThrow,
  getWrapper,
  postWrapper,
  putWrapper,
  deleteWrapper,
  ADMIN_PRODUCTS,
} from "./util";

export const adminProductsList = async () => {
  const resJSON = await getWrapper(ADMIN_PRODUCTS);
  return returnOrThrow(resJSON);
};

export const adminProductDetails = async (id) => {
  const resJSON = await getWrapper(`${ADMIN_PRODUCTS}/${id}`);
  return returnOrThrow(resJSON);
};

export const adminCreateProduct = async (data) => {
  const resJSON = await postWrapper(ADMIN_PRODUCTS, data, true); // fileUpload true
  return returnOrThrow(resJSON);
};

export const adminUpdateProduct = async (id, data) => {
  const resJSON = await putWrapper(`${ADMIN_PRODUCTS}/${id}`, data, true); // fileUpload true
  return returnOrThrow(resJSON);
};

export const adminDeleteProduct = async (id) => {
  const resJSON = await deleteWrapper(`${ADMIN_PRODUCTS}/${id}`);
  return returnOrThrow(resJSON);
};
