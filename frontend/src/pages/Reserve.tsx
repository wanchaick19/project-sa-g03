import React, { useState, useEffect } from 'react';
import { Popup } from '../components/Popup';
import { ConfirmationPopup } from '../components/ConfirmationPopup';
import { CheckOutlined, ClockCircleOutlined ,DoubleRightOutlined, NotificationOutlined } from '@ant-design/icons'; // Import the required icons from Ant Design
import './reserve.css';
import { Tooltip } from 'antd';



type Lock = {
  id: string;
  status: string;
  price: number;
  size: string;
};

const lockdata: Lock[] = [
  { id: 'A00', status: 'ว่าง', price: 200, size: '2x2' },
  { id: 'A01', status: 'ว่าง', price: 200, size: '2x2' },
  { id: 'A02', status: 'ไม่ว่าง', price: 200, size: '2x2' },
  { id: 'A03', status: 'ว่าง', price: 200, size: '2x2' },
  { id: 'A04', status: 'ว่าง', price: 200, size: '2x2' },
  { id: 'A05', status: 'ไม่ว่าง', price: 200, size: '2x2' },
  { id: 'A06', status: 'ว่าง', price: 200, size: '2x2' },
  { id: 'B00', status: 'ไม่ว่าง', price: 250, size: '2x2' },
  { id: 'B01', status: 'ว่าง', price: 250, size: '2x2' },
  { id: 'B02', status: 'ว่าง', price: 250, size: '2x2' },
  { id: 'B03', status: 'ว่าง', price: 250, size: '2x2' },
  { id: 'B04', status: 'ว่าง', price: 250, size: '2x2' },
  { id: 'B05', status: 'ว่าง', price: 250, size: '2x2' },
  { id: 'B06', status: 'ไม่ว่าง', price: 250, size: '2x2' },
  { id: 'C00', status: 'ว่าง', price: 300, size: '2x2' },
  { id: 'C01', status: 'ว่าง', price: 300, size: '2x2' },
  { id: 'C02', status: 'ว่าง', price: 300, size: '2x2' },
  { id: 'C03', status: 'ไม่ว่าง', price: 300, size: '2x2' },
  { id: 'C04', status: 'ว่าง', price: 300, size: '2x2' },
  { id: 'C05', status: 'ว่าง', price: 300, size: '2x2' },
  { id: 'C06', status: 'ว่าง', price: 300, size: '2x2' },
  { id: 'D16', status: 'ไม่พร้อมใช้งาน', price: 300, size: '2x2' },
];


const Reserve: React.FC = () => {
  const [selectedLocks, setSelectedLocks] = useState<Lock[]>([]);
  const [locks, setLocks] = useState<Lock[]>(lockdata);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const getFormattedDateTime = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString(); // Convert to Thai Buddhist year
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Format date only
  const getFormattedDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = (date.getFullYear() + 543).toString(); // Convert to Thai Buddhist year
    return `${day}-${month}-${year}`;
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const tomorrowOption = getFormattedDate(tomorrow);

  const handleLockClick = (lockId: string, status: string) => {
    if (status !== 'ว่าง') return; // Only proceed if the lock is available
  
    const selectedLock = locks.find((lock) => lock.id === lockId);
    if (!selectedLock) return;
  
    if (selectedLocks.includes(selectedLock)) {
      setSelectedLocks(selectedLocks.filter((lock) => lock.id !== lockId));
    } else {
      setSelectedLocks([...selectedLocks, selectedLock]);
    }
  };
  

  const handleProceed = () => {
    if (selectedLocks.length > 0) {
      setShowPopup(true);
    } else {
      alert('กรุณาเลือกล็อคก่อนดำเนินการต่อ');
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirmBooking = () => {
    const updatedLocks = locks.map((lock) =>
      selectedLocks.includes(lock) ? { ...lock, status: 'ไม่ว่าง' } : lock
    );
    setLocks(updatedLocks);
    setSelectedLocks([]);
    setShowPopup(false);
    setShowConfirmation(true);
  };
  

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Calculate total price
  const totalPrice = selectedLocks.reduce((sum, lock) => sum + lock.price, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center', position: 'relative', minHeight: '100vh' }}>
      <div style={{ flex: 1, padding: '20px', marginRight: '20px' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px', color: 'black' }}>
        <NotificationOutlined /> จองสำหรับวันที่: {getFormattedDate(new Date())} (พรุ่งนี้)
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: 'black' }}>
          <ClockCircleOutlined /> ขณะนี้: {getFormattedDateTime(currentTime)}
        </div>
        <div style={{ marginTop: '40px' }}>
          <h1>
          <DoubleRightOutlined  /> โปรดเลือกล็อค <span style={{ color: 'red' }}>*</span>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            {['A', 'B', 'C', 'D'].map((row, index) => (
              <div key={index} style={{ margin: '10px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                {locks.filter((lock) => lock.id.startsWith(row)).map((lock) => (
  <Tooltip
    key={lock.id}
    title={`ล็อค: ${lock.id} | ขนาด: ${lock.size} เมตร | ราคา: ${lock.price} บาท | สถานะ: ${lock.status}`}
    placement="top"
    overlayInnerStyle={{
      backgroundColor: 'white', // Set background color to white
      color: 'black', // Set text color to black
      padding: '10px', // Add padding for better spacing
      borderRadius: '8px', // Rounded corners for a softer look
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Add subtle shadow for depth
    }}
  >
    <button
      onClick={() => handleLockClick(lock.id, lock.status)}
      style={{
        margin: '5px',
        width: '120px',
        height: '90px',
        maxWidth: '120px',
        maxHeight: '90px',
        backgroundColor: lock.status === 'ว่าง' ? '#32cd32' : lock.status === 'ไม่ว่าง' ? 'red' : 'gray',
        color: 'white',
        cursor: lock.status === 'ว่าง' ? 'pointer' : 'not-allowed',
        borderRadius: '15px',
        fontSize: '25px',
        transition: 'transform 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="lock-button"
    >
      {selectedLocks.includes(lock) ? <CheckOutlined /> : lock.id}
    </button>
  </Tooltip>
))}

              </div>
            ))}
          </div>
        </div>
      </div>
  
      <div style={{ flex: 0.5, padding: '20px', borderLeft: '1px solid #ddd', maxHeight: '80vh', overflowY: 'auto', marginTop: '100px' }}> {/* เพิ่ม marginTop ที่นี่ */}
        <h3>รายการล็อคที่เลือก</h3>
        <p/>
        {selectedLocks.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {selectedLocks.map((lock) => (
              <li key={lock.id} style={{ marginBottom: '5px', fontSize: '18px' }}>
                ล็อค: {lock.id} กว้าง {lock.size} เมตร - ราคา {lock.price} บาท 
              </li>
            ))}
          </ul>
        ) : (
          <p>ยังไม่ได้เลือกล็อค</p>
        )}
        <h5>ราคารวม: {totalPrice} บาท</h5>
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleProceed}
            className='reserve-button'
          >
            จอง
          </button>
        </div>
      </div>
  
      {showPopup &&
        <Popup
          selectedLocks={selectedLocks}
          dateOption={tomorrowOption}
          onClose={handleClosePopup}
          onConfirm={handleConfirmBooking}
        />}
      {showConfirmation &&
        <ConfirmationPopup
          onClose={handleCloseConfirmation}
        />}
    </div>
  );
  
};

export default Reserve;
