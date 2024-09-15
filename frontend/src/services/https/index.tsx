import { LocksInterface } from "../../interfaces/ILock";
import { ReservesInterface } from "../../interfaces/IReserve";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
import { ShopsInterface } from "../../interfaces/IShop";
import { UsersInterface } from "../../interfaces/IUser";

import { SignInInterface } from "../../interfaces/SignIn";


import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");


const requestOptions = {

  headers: {

    "Content-Type": "application/json",

    Authorization: `${Bearer} ${Authorization}`,

  },

};


async function SignIn(data: SignInInterface) {

  return await axios

    .post(`${apiUrl}/signin`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetLocks() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/locks`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


async function GetUsersById(id: string) {

  return await axios

    .get(`${apiUrl}/user/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReservesByShopId(id: number) {

  return await axios

    .get(`${apiUrl}/reserves/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReservesDetailsByReserveId(id: number) {

  return await axios

    .get(`${apiUrl}/reservesdetails/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetShopByUserId(id: string) {

  return await axios

    .get(`${apiUrl}/shopbyuser/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}



async function UpdateUsersById(id: string, data: UsersInterface) {

  return await axios

    .put(`${apiUrl}/user/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}


async function CreateUser(data: UsersInterface) {

  return await axios

    .post(`${apiUrl}/signup`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateReserveDetails(data: ReserveDetailsInterface) {

  return await axios

    .post(`${apiUrl}/createdetails`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateReserve(data: ReservesInterface) {
  return await axios
    .post(`${apiUrl}/createreserve`, data, requestOptions)

    .then((res) => res.data)  // คืนเฉพาะ res.data ซึ่งเป็นข้อมูลที่เราสนใจ

    .catch((e) => {

      return e.response;
    });
}

async function UpdateLocksById(id: string, data: LocksInterface) {

  return await axios

    .put(`${apiUrl}/updatelock/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CancelLockById(id: string, data: LocksInterface) {

  return await axios

    .put(`${apiUrl}/cancelLock/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function cancelReserveById(id: number, data: ReservesInterface) {

  return await axios

    .put(`${apiUrl}/cancelReserve/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function ResetLocks() {

  return await axios

    .put(`${apiUrl}/resetlocks`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

//ของโอ๊ตต

async function CreateShop(data: ShopsInterface) {

  return await axios

    .post(`${apiUrl}/createshop`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetUsersByUserId(id: string) {

  return await axios

    .get(`${apiUrl}/users/${id}`, requestOptions)

    .then((res) => res.data)

    .catch((e) => e.response);

}

// jibbb

async function GetShops() {

  return await axios

    .get(`${apiUrl}/getshops`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetCategories() {

  return await axios

    .get(`${apiUrl}/categories`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReviewsByShopId(id: string) {

  return await axios

    .get(`${apiUrl}/review/${id}`, requestOptions)

    .then((res) => res.data)

    .catch((e) => e.response);

}

async function GetShopById(id: string) {

  return await axios

    .get(`${apiUrl}/shop/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function CreateReview(data: ShopsInterface) {

  return await axios

    .post(`${apiUrl}/createreview`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}





export {

  SignIn,

  GetUsersById,

  UpdateUsersById,

  CreateUser,

  GetShopByUserId,

  CreateReserve,

  CreateReserveDetails,

  GetLocks,

  GetReservesByShopId,

  GetReservesDetailsByReserveId,

  UpdateLocksById,

  cancelReserveById,
  
  CancelLockById,

  ResetLocks,

  CreateShop,

  GetUsersByUserId,

  GetShops,

  GetCategories,

  GetReviewsByShopId,

  GetShopById,

  CreateReview,

};