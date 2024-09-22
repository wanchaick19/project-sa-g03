import React, { useState, useEffect } from 'react';
import { Popup } from '../../components/reservePopup/Popup';
import ConfirmationPopup from '../../components/reservePopup/ConfirmationPopup';
import { CheckOutlined, ClockCircleOutlined, CodepenOutlined, NotificationOutlined , ShopOutlined
  , CheckCircleOutlined, FileDoneOutlined , InboxOutlined, InfoCircleOutlined} from '@ant-design/icons';
import './reserve.css';
import { Tooltip, message } from 'antd';
import { GetLocks, CreateReserve, CreateReserveDetails, GetShopByUserId ,UpdateLocksById} from '../../services/https/index';
import { ShopsInterface } from '../../interfaces/IShop';
import { ReservesInterface } from '../../interfaces/IReserve';
import { LocksInterface } from '../../interfaces/ILock';


const Reserve: React.FC = () => {
  //สำหรับเก็บข้อมูล็อค
  const [locks, setLocks] = useState<LocksInterface[]>([]);

  //สำหรับเก็บข้อมูลล็อคที่เลือก
  const [selectedLocks, setSelectedLocks] = useState<LocksInterface[]>([]);

  //สำหรับจัดการการแสดงป๊อปอัพ
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  //สำหรับเก็บเวลาขณะนี้
  const [currentTime, setCurrentTime] = useState(new Date());

  //สำหรับเก็บข้อมูลร้าน
  const [shop, setShop] = useState<ShopsInterface>();

  //สำหรับแสดงข้อความ
  const [messageApi, contextHolder] = message.useMessage();

  //id user ที่กำลังล็อคอินอยู่
  const userId = localStorage.getItem("id");

  //เช็คว่าล็อคอินแล้วหรือยัง
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin') === 'true';
    if (!loginStatus) {
      sessionStorage.setItem('showLoginMessage', 'true');
      window.location.href = '/login';
    }
}, []);

  
  //ดึงข้อมูลล็อคทั้งหมด
  const getLocks = async () => {
    try {
      const res = await GetLocks();
      setLocks(res);
    } catch (error) {
      messageApi.error('Error fetching locks');
    }
  };

  useEffect(() => {
    getLocks();
  }, []);


  //ทำให้เวลาที่แสดงที่หน้าจอเปลี่ยนทุก1วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  //สร้างวันที่และเวลา
  const getFormattedDateTime = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  //สร้างวันที่
  const getFormattedDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString();
    return `${day}-${month}-${year}`;
  };

  //วันที่ของวันนี้
  const today = new Date();
  const todayoption = getFormattedDate(today);


  //handleสำหรับการคลิ๊กที่ล็อค
  const handleLockClick = (lockId: string, status: string) => {
    if (status !== 'ว่าง') return; //หากไม่ว่างจะกดไม่ได้

    const selectedLock = locks.find((lock) => lock.Id === lockId);
    if (!selectedLock) return;

    setSelectedLocks((prev) =>
      prev.includes(selectedLock)
        ? prev.filter((lock) => lock.Id !== lockId)
        : [...prev, selectedLock]
    );
  };


  //handleสำหรับการกดจอง
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


  //handleสำหรับปิดป๊อปอัพ
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  //ดึงข้อมูลร้านค้าจากผู้ใช้ที่เข้าใช้งานอยู่
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


  //handleสำหรับการกดจองในหน้าป๊อปอัพ
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

      selectedLocks.map(async (lock) => {
          const reserveDetail = {
            ReserveID: createdReserve.ID,
            LockID: lock.Id,
          };
          const data = {
          };
          await CreateReserveDetails(reserveDetail);
          await UpdateLocksById(lock.Id, data);
      })
      setSelectedLocks([]);
      setShowPopup(false);
      setShowConfirmation(true); // Show confirmation popup
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการจอง");
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  //คำนวณราคาล็อคที่เลือก
  const totalPrice = selectedLocks.reduce((sum, lock) => sum + lock?.Price, 0);

  return (
    <div style={{display: 'flex', flexDirection: 'row', textAlign: 'center', position: 'relative', minHeight: '100vh'  }}>
      {contextHolder}
      <div style={{ flex: 1, padding: '20px', marginRight: '20px' }}>
      <div className="marquee-container">
        <span className="marquee-text">
          <NotificationOutlined /> จองสำหรับวันที่: {todayoption} (เวลา: 18:00 - 24:00 น.) 
        </span>
     </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'black' }}>
          <ClockCircleOutlined /> ขณะนี้: {getFormattedDateTime(currentTime)}
        </div>
        <div style={{ marginTop: '50px' }}>
          <h1>
          <CodepenOutlined /> โปรดเลือกล็อค <a style={{ color: 'red' }}>*</a>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '30px' }}>
           {['A', 'B', 'C', 'D', 'E','F'].map((row, index) => (
            <div key={index} style={{ margin: '10px', display: 'flex', justifyContent: 'center', gap: '2px' }}>
              {locks.filter((lock) => lock.Id.startsWith(row)).map((lock) => (
                
    //สำหรับแสดงข้อมูลเวลาเอาเมาส์ไปจ่อที่ล็อค
        <Tooltip
          key={lock.Id}
          title={`ล็อค: ${lock.Id} | ขนาด: ${lock.Size} เมตร | ราคา: ${lock.Price} บาท | สถานะ: ${lock.Status}`}
          placement="top"
        >
          <button 
            onClick={() => handleLockClick(lock.Id, lock.Status)}
            className={`lock-button ${lock.Status === 'ว่าง'? 'available' : 'disabled'}`}
        >
            {lock.Status !== 'ว่าง' ? <ShopOutlined style={{color: "black"}}/> : selectedLocks.includes(lock) ? <CheckOutlined /> : lock.Id}
        </button>
        </Tooltip>
      ))}
    </div>
  ))}
  
</div>
        </div>
      </div>
      <div style={{ flex: 0.5, padding: '20px', borderLeft: '1px solid #ddd', maxHeight: '80vh', overflowY: 'auto', marginTop: '100px' }}>
        <h3><InboxOutlined /> รายการล็อคที่เลือก</h3>
        {selectedLocks.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            <p style={{marginTop: "20px"}}/>
            {selectedLocks.map((lock) => (
              <li key={lock.Id} style={{ marginBottom: '5px', fontSize: '18px' }}>
                <CheckCircleOutlined style={{color: "green"}}/> ล็อค: {lock.Id} กว้าง {lock.Size} เมตร - ราคา {lock.Price} บาท
              </li>
            ))}
          </ul>
        ) : (
          <h5 style={{marginTop: "20x" }}><InfoCircleOutlined style={{color: "red"}}/> ยังไม่ได้เลือกล็อค</h5>
        )}
        <h4 style={{marginTop: "20px"}}>ราคารวม: {totalPrice} บาท</h4>
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleProceed} className='reserve-button'>
          <FileDoneOutlined /> จอง
          </button>
        </div>
      </div>

      {/* สำหรับแสดงป็อปอัพ */}
      {showPopup && (
        <Popup
          selectedLocks={selectedLocks}
          dateOption={todayoption}
          onClose={handleClosePopup}
          onConfirm={() => handleConfirmBooking(today)}
        />
      )}
      {showConfirmation && <ConfirmationPopup onClose={handleCloseConfirmation} />}
    </div>
  );
};

export default Reserve;
