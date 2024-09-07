import React from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

export
const ConfirmationPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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
        <h3>บันทึกการจองสำเร็จ</h3>
        <CheckCircleOutlined style={{ color: 'green', fontSize: '48px' }} />
        <p/>
        <p>กดปุ่ม "ต่อไป" เพื่อทำรายการต่อ</p>
        <button onClick={onClose} className="popup-button confirm" style={{ marginTop: '20px' }}>
          ต่อไป
        </button>
      </div>
    </div>
  );
};


