import React from 'react';

type Locks = {
  Id: string;
  Status: string;
  Price: number;
  Size: string;
};

export 

const Popup: React.FC<{ selectedLocks: Locks[], dateOption: string, onClose: () => void, onConfirm: () => void }> = ({ selectedLocks, dateOption, onClose, onConfirm }) => {
  const totalPrice = selectedLocks.reduce((sum, lock) => sum + lock.Price, 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '300px'
      }}>
        <h3>รายละเอียดการจอง</h3>
        <p>วันที่: {dateOption}</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {selectedLocks.map(lock => (
            <li key={lock.Id} style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px', textAlign: 'center' }}>
              <span style={{ marginRight: '10px' }}>{lock.Id}</span>
              <span>ราคา {lock.Price} บาท</span>
            </li>
          ))}
        </ul>
        <p>ราคารวมทั้งหมด: {totalPrice} บาท</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={onClose} className="popup-button cancel">
            ยกเลิก
          </button>
          <button onClick={onConfirm} className="popup-button confirm">
            จอง
          </button>
        </div>
      </div>
    </div>
  );
};
