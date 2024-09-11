import React, { useState, useEffect } from 'react';
import { Popup } from '../../components/reservePopup/Popup';
import ConfirmationPopup from '../../components/reservePopup/ConfirmationPopup';
import { CheckOutlined, ClockCircleOutlined, DoubleRightOutlined, NotificationOutlined } from '@ant-design/icons';
import './reserve.css';
import { Tooltip, message } from 'antd';
import { GetLocks, CreateReserve, CreateReserveDetails, GetShopByUserId } from '../../services/https/index';
import { useNavigate } from "react-router-dom";
import { ShopsInterface } from '../../interfaces/IShop';
import { ReservesInterface } from '../../interfaces/IReserve';

type Lock = {
  Id: string;
  Status: string;
  Price: number;
  Size: string;
};

const Reserve: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locks, setLocks] = useState<Lock[]>([]);
  const [selectedLocks, setSelectedLocks] = useState<Lock[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [shop, setShop] = useState<ShopsInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin') === 'true';
    setIsLoggedIn(loginStatus);
    if (!loginStatus) {
      window.location.href = '/login';
    }
  }, []);

  const getLocks = async () => {
    try {
      const res = await GetLocks();
      setLocks(res);
    } catch (error) {
      messageApi.error('Error fetching locks');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getFormattedDateTime = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const getFormattedDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    return `${day}-${month}-${year}`;
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowOption = getFormattedDate(tomorrow);

  const handleLockClick = (lockId: string, status: string) => {
    if (status !== 'ว่าง') return;

    const selectedLock = locks.find((lock) => lock.Id === lockId);
    if (!selectedLock) return;

    setSelectedLocks((prev) =>
      prev.includes(selectedLock)
        ? prev.filter((lock) => lock.Id !== lockId)
        : [...prev, selectedLock]
    );
  };

  const handleProceed = () => {
    if (!shop || !shop.ID) {
      message.info('ไม่มีข้อมูลร้านค้าของท่าน โปรดทำการลงทะเบียนร้านค้าก่อนทำการจอง!!');
      return;
    }

    if (selectedLocks.length > 0) {
      setShowPopup(true);
    } else {
      message.info('กรุณาเลือกล็อคก่อนทำการจอง!!');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const getShop = async (userId: string) => {
    try {
      const res = await GetShopByUserId(userId);
      setShop(res.data);
    } catch (error) {
      messageApi.error('Error fetching shop data');
    }
  };

  useEffect(() => {
    if (userId) {
      getShop(userId);
    }
  }, [userId]);

  const handleConfirmBooking = async (date: Date) => {
    const values: ReservesInterface = {
      Date: date.toISOString(),
      ShopID: shop?.ID,
      TotalPrice: totalPrice,
    };

    try {
      const res = await CreateReserve(values);
      const createdReserve = res.data;

      messageApi.success("จองสำเร็จ!");

      // Create reserve details for selected locks
      await Promise.all(
        selectedLocks.map(async (lock) => {
          const reserveDetail = {
            ReserveID: createdReserve.ID,
            LockID: lock.Id,
            Price: lock.Price,
          };
          await CreateReserveDetails(reserveDetail);
        })
      );

      // Update lock status after successful booking
      const updatedLocks = locks.map((lock) =>
        selectedLocks.includes(lock) ? { ...lock, Status: 'ไม่ว่าง' } : lock
      );
      setLocks(updatedLocks); // Update locks in state
      setSelectedLocks([]); // Reset selected locks after booking

      setShowPopup(false);
      setShowConfirmation(true); // Show confirmation popup
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการจอง");
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    // Navigate or perform any other action here if needed
    navigate("/nextpage"); // Redirect to another page if required
  };

  useEffect(() => {
    getLocks();
  }, []);

  const totalPrice = selectedLocks.reduce((sum, lock) => sum + lock.Price, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', position: 'relative', minHeight: '100vh' }}>
      {contextHolder}
      <div style={{ flex: 1, padding: '20px', marginRight: '20px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px', color: 'black' }}>
          <NotificationOutlined /> จองสำหรับวันที่: {tomorrowOption} (พรุ่งนี้)
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'black' }}>
          <ClockCircleOutlined /> ขณะนี้: {getFormattedDateTime(currentTime)}
        </div>
        <div style={{ marginTop: '40px' }}>
          <h1>
            <DoubleRightOutlined /> โปรดเลือกล็อค <span style={{ color: 'red' }}>*</span>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            {['A', 'B', 'C', 'D'].map((row, index) => (
              <div key={index} style={{ margin: '10px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {locks.filter((lock) => lock.Id.startsWith(row)).map((lock) => (
                  <Tooltip
                    key={lock.Id}
                    title={`ล็อค: ${lock.Id} | ขนาด: ${lock.Size} เมตร | ราคา: ${lock.Price} บาท | สถานะ: ${lock.Status}`}
                    placement="top"
                  >
                    <button
                      onClick={() => handleLockClick(lock.Id, lock.Status)}
                      style={{
                        margin: '5px',
                        width: '110px',
                        height: '80px',
                        maxWidth: '120px',
                        maxHeight: '90px',
                        backgroundColor: lock.Status === 'ว่าง' ? '#32cd32' : lock.Status === 'ไม่ว่าง' ? 'red' : 'gray',
                        color: 'white',
                        cursor: lock.Status === 'ว่าง' ? 'pointer' : 'not-allowed',
                        borderRadius: '15px',
                        fontSize: '25px',
                        transition: 'transform 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      className="lock-button"
                    >
                      {selectedLocks.includes(lock) ? <CheckOutlined /> : lock.Id}
                    </button>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 0.5, padding: '20px', borderLeft: '1px solid #ddd', maxHeight: '80vh', overflowY: 'auto', marginTop: '100px' }}>
        <h3>รายการล็อคที่เลือก</h3>
        {selectedLocks.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {selectedLocks.map((lock) => (
              <li key={lock.Id} style={{ marginBottom: '5px', fontSize: '18px' }}>
                ล็อค: {lock.Id} กว้าง {lock.Size} เมตร - ราคา {lock.Price} บาท
              </li>
            ))}
          </ul>
        ) : (
          <p>ยังไม่ได้เลือกล็อค</p>
        )}
        <h5>ราคารวม: {totalPrice} บาท</h5>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleProceed} className='reserve-button'>
            จอง
          </button>
        </div>
      </div>

      {showPopup && (
        <Popup
          selectedLocks={selectedLocks}
          dateOption={tomorrowOption}
          onClose={handleClosePopup}
          onConfirm={() => handleConfirmBooking(tomorrow)}
        />
      )}
      {showConfirmation && <ConfirmationPopup onClose={handleCloseConfirmation} />}
    </div>
  );
};

export default Reserve;
