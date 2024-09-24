import React, { useState } from 'react';
import LockData from '../../components/DataTable/locksData';
import { Button, Modal, message } from 'antd';
import CreateLockForm from '../../components/CreateLock/CreateLock'; // นำเข้า component สำหรับสร้างล็อคใหม่
import './LockStyle.css'; // นำเข้าไฟล์ CSS สำหรับการจัดรูปแบบ
import Static from '../../components/Static/Static';
import { UpdateStatus } from '../../services/https/index'; // นำเข้าฟังก์ชัน UpdateStatus

const Locks: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true); // เปิด modal เมื่อคลิกปุ่ม
  };

  const handleCancel = () => {
    setIsModalVisible(false); // ปิด modal
  };

  const handleClearStatus = async () => {
    try {
      const success = await UpdateStatus();
      if (success) {
        message.success('Status cleared successfully.');
        window.location.reload(); // รีเฟรชข้อมูลล็อคเพื่อแสดงสถานะที่อัปเดต
      } else {
        message.error('Failed to clear status.');
      }
    } catch (error) {
      message.error('An error occurred while clearing status.');
      console.error('Error clearing status:', error);
    }
  };

  return (
    <>
      <div className="dashboard-component">
      </div>
      <div className="locks-page">
        <Static/>
        <div className="lock-management">
          
          <Button 
            className="create-button" 
            type="primary" 
            onClick={showModal}
          >
            + Create Lock
          </Button>
        
          <Button 
            className="clear-status-button" 
            type="default" 
            onClick={handleClearStatus}
          >
            Clear Status
          </Button>

          <div className="lock-data-container">
            <LockData />
            
          </div>
        </div>
      </div>

      <Modal
        title="Create New Lock"
        visible={isModalVisible}
        footer={null} // ไม่มี footer สำหรับปุ่ม OK/Cancel
        onCancel={handleCancel} // เมื่อปิด modal
        className="create-lock-modal" // ใช้คลาส CSS สำหรับโมดัล
      >
        <CreateLockForm /> {/* แสดงฟอร์มสำหรับสร้างล็อคใหม่ */}
      </Modal>
    </>
  );
};

export default Locks;