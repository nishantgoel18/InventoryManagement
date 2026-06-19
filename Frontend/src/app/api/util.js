import { SOMETHING_WENT_WRONG } from "../../utils";

export const PRODUCT_TYPES = ["TShirt", "Romper", "Hoodie"];

// Host
export const HOST = "http://127.0.0.1:8000/";
export const IMAGE_HOST = "http://localhost:8000";

const BASE = HOST + "api";

export const ADMIN_PRODUCTS = BASE + "/products";
export const ADMIN_ORDERS = BASE + "/orders";
export const ADMIN_CUSTOMERS = BASE + "/customers";

export const ADMIN_INVENTORY = BASE + "/inventory";

export const saveFcmToken = (fcm) => {
  localStorage.setItem("fcmToken", fcm);
};

export const getToken = () => {
  const token = localStorage.getItem("Token");
  return token;
};

export const getUserType = () => {
  const user_type = localStorage.getItem("userType");
  return user_type;
};

export const GST_REGEX =
  /^\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}$/;

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const getHeadersObject = () => {
  const token = getToken();
  return {
    Authorization: `${token}`,
    "Content-Type": "application/json",
    // 'ngrok-skip-browser-warning': '69420',
  };
};

const getHeadersFileObject = () => {
  const token = getToken();
  return {
    Authorization: `${token}`,
    // 'Content-Type': 'multipart/form-data',
  };
};

export const getImageUrl = (url) => {
  console.log("getImageUrl", url);
  const completeUrl = url?.indexOf("http") > -1 ? url : IMAGE_HOST + url;
  return completeUrl;
};

export function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

// API Wrappers
export const returnOrThrow = async (resJSON) => {
  let result;
  const status = resJSON.status;
  if (status === 404 || status >= 500) {
    throw `${SOMETHING_WENT_WRONG}!`;
  } else if (status === 401) {
    throw "sessionTimeout";
  }
  try {
    result = await resJSON.json();
  } catch (err) {
    result = { error: SOMETHING_WENT_WRONG };
  }
  if (status !== 200 && status !== 201) {
    throw result.error;
  }
  return result;
};

export const putWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "PUT",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const postWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "POST",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const patchWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "PATCH",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const getWrapper = async (url, body = {}) => {
  const headers = await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "GET",
    headers,
  });
  return resJSON;
};

export const deleteWrapper = async (url, body, fileUpload = false) => {
  const headers = fileUpload
    ? await getHeadersFileObject()
    : await getHeadersObject();
  const resJSON = await fetch(url, {
    method: "DELETE",
    body: fileUpload ? body : JSON.stringify(body),
    headers,
  });
  return resJSON;
};

export const invoiceURL = (id) => {
  return HOST + `/bookings/${id}/generate-invoice.pdf`;
};

export const pnrURL = (id, passenger = "all") => {
  return (
    HOST + `/bookings/${id}/generate-pnr-status.pdf?passenger=${passenger}`
  );
};
