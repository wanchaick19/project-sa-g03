import { LocksInterface } from "../../interfaces/ILock";
import { ReservesInterface } from "../../interfaces/IReserve";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
import { ShopsInterface } from "../../interfaces/IShop";
import { UsersInterface } from "../../interfaces/IUser";
import { PaymentInterface } from "../../interfaces/IPayment";
import { SignInInterface } from "../../interfaces/SignIn";
import { ReviewInterface } from "../../interfaces/IReview";


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

  return await axios

    .get(`${apiUrl}/locks`, requestOptions)

    .then((res) => res.data)

    .catch((e) => e.response);

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

async function UpdateLockById(id: string | undefined, data: LocksInterface) {

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

async function GetMaps() {

  return await axios

    .get(`${apiUrl}/getmaps`, requestOptions)

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
 async function GetReviewsByShopId(id: string | undefined ) {
  return await axios
  .get(`${apiUrl}/shop/${id}/review`, requestOptions)
  .then((res) => res.data)
  .catch((e) => e.response);
 }
 async function GetShopById(id: string) {
  return await axios
  .get(`${apiUrl}/shop/${id}`, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
 }
 async function CreateReview(data: ReviewInterface) {
  return await axios
  .post(`${apiUrl}/createreview`, data, requestOptions)
  .then((res) => res)
  .catch((e) => e.response);
 } 

//payment

async function CreatePayment(data: PaymentInterface) {

  return await axios

    .post(`${apiUrl}/payments`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetPaymentByShopId(id: number) {

  return await axios

    .get(`${apiUrl}/payments/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function GetReservesByReseveId(id: string) {

  return await axios

    .get(`${apiUrl}/reserve/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdateReserveStatus(id: string, data: string) {

  return await axios

    .put(`${apiUrl}/reserve/${id}`,data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

//managelocks
async function DeleteLockByID(id: string | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/locks/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

async function GetLockById(id: string | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/locks/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


async function CreateLock(data: LocksInterface) {
  try {
      const response = await axios.post(`${apiUrl}/locks`, data, requestOptions);
      return response.data;  // คืนค่าเฉพาะข้อมูลที่สำคัญจาก Response
  } catch (error) {
      // ตรวจสอบว่า error มี response หรือไม่ และคืนค่าเป็นข้อมูลที่เข้าใจได้
      if (axios.isAxiosError(error) && error.response) {
          return { error: error.response.data.error || 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' }; // คืนค่า error จาก API
      }
      return { error: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' }; // กรณีอื่น ๆ
  }
}

async function UpdateLock(data: LocksInterface) {
  if (!data.id) {
    throw new Error('ID is missing');
  }

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/locks/${data.id}`, requestOptions);
    if (response.ok) {
      return true;
    } else {
      console.error('Failed to update lock:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error updating lock:', error);
    return false;
  }
}

async function UpdateLocksById(id: string, data: LocksInterface) {

  return await axios

    .put(`${apiUrl}/locks/${id}`, data, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);

}

async function UpdateStatus() {
  try {
    // แก้ไขค่าตามสถานะที่ต้องการเคลียร์และสถานะใหม่
    const response = await axios.post(`${apiUrl}/clear-status`, {
      statusToClear: 'ไม่ว่าง', // ใช้ค่าจริงที่ต้องการเคลียร์
      newStatus: 'ว่าง' // ใช้ค่าจริงที่ต้องการเปลี่ยนเป็น
    });
    return response.status === 200;
  } catch (error) {
    console.error('Error clearing status:', error);
    throw error;
  }
}

async function GetTotalShops() {
  try {
    const response = await axios.get(`${apiUrl}/api/count-shops`, requestOptions);
    return response.data.totalShops;
  } catch (error) {
    console.error('Error fetching total shops:', error);
    throw error;
  }
}

async function GetTotalUsers() {
  try {
    const response = await axios.get(`${apiUrl}/api/count-users`, requestOptions);
    return response.data.totalUsers;
  } catch (error) {
    console.error('Error fetching total users:', error);
    throw error;
  }
}
async function GetTotalReservationsPrice() {
  try {
    const response = await axios.get(`${apiUrl}/api/sum-reservations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching total reservations price:', error);
    throw error;
  }
}

async function GetDashboardData() {
  try {
    const response = await axios.get(`${apiUrl}/api/dashboard`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to load dashboard data.');
  }
}


async function UpdateLockStatus(id: string, newStatus: string): Promise<boolean> {
  try {
    // ส่งคำขอ PATCH เพื่ออัปเดตสถานะของล็อค
    const response = await axios.put(`${apiUrl}/locks/${id}/update`, {
      Status: newStatus,
    });

    if (response.status === 200) {
      return true; // สำเร็จ
    } else {
      return false; // ไม่สำเร็จ
    }
  } catch (error) {
    console.error('Error updating lock status:', error);
    return false;
  }
}




export {

  //users
  SignIn,
  GetUsersById,
  UpdateUsersById,
  CreateUser,


  //shop
  GetShopByUserId,


  //Reserve
  CreateReserve,
  CreateReserveDetails,
  GetReservesByShopId,
  GetReservesDetailsByReserveId,
  cancelReserveById,

  //Lock
  GetLocks,
  UpdateLockById,
  CancelLockById,
  //ResetLocks,

  //Map
  GetMaps,

  //Payment
  CreatePayment,
  GetPaymentByShopId,
  GetReservesByReseveId,
  UpdateReserveStatus,

  //shop
  CreateShop,

  //review
  GetShops,
  GetCategories,
  GetReviewsByShopId,
  GetShopById,
  CreateReview,

  //managelocks
  DeleteLockByID,
  GetLockById,
  CreateLock,
  UpdateLock,
  UpdateLocksById,
  UpdateStatus,
  GetTotalShops,
  GetTotalUsers,
  GetDashboardData,
  GetTotalReservationsPrice,
  UpdateLockStatus

};