import { ReservesInterface } from "../../interfaces/IReserve";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
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




async function GetUsers() {

  return await axios

    .get(`${apiUrl}/users`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReserves() {

  return await axios

    .get(`${apiUrl}/reserves`, requestOptions)

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


async function DeleteUsersById(id: string) {

  return await axios

    .delete(`${apiUrl}/user/${id}`, requestOptions)

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


export {

  SignIn,

  GetUsers,

  GetUsersById,

  UpdateUsersById,

  DeleteUsersById,

  CreateUser,

  GetShopByUserId,

  CreateReserve,

  CreateReserveDetails,

  GetLocks,

  GetReserves,

};