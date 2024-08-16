// src/utils/apiEnums.ts

export enum ApiEndpoints {
  //auth
  Register = "/api/v1/auth/register",
  Login = "/api/v1/auth/login",
  Verify = "/api/v1/auth/verify",

  //item
  GetListItems = "/api/v1/items/", //optional: ${item.id}
  CreateItem = "/api/v1/items/create",
  UpdateItem = "/api/v1/items/update/", //required: ${item.id}
  DeleteItem = "/api/v1/items/delete/", //required: ${item.id}
  ShareItem = "/api/v1/items/share",
  CreateShareItem = "/api/v1/items/share/create",

  //history
  GetDeviceHistory = "/api/v1/devices",
  GetHistory = "/api/v1/history/filling/", //optional: ${item.id}

  //key
  GetKey = "/api/v1/auth/keys/", //optional: ${subject}
}

export default ApiEndpoints;
