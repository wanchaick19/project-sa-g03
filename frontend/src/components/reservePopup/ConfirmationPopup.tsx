import React from 'react';
import { ContainerOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface ConfirmationPopupProps {
  onClose: () => void; // Optional onClose handler for additional actions
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    // Close the popup if there's any cleanup needed
    if (onClose) {
      onClose();
    }

    // Navigate to the desired page, e.g., "/nextpage"
    navigate('/reserve_dashboard'); // Replace '/nextpage' with your target path
  };

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
        <h3><ContainerOutlined /> จองสำเร็จ</h3>
        
        <p style={{marginTop: "40px"}}>กดปุ่ม "ต่อไป" เพื่อทำรายการต่อ</p>
        <button
          onClick={handleNext}
          className="popup-button confirm"
          style={{ marginTop: '20px' }}
        >
          ต่อไป
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
