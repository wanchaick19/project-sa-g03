import React, { useState, useEffect, ChangeEvent } from 'react';
import { Lock} from '../../interfaces/ILock'; // นำเข้า interface ของ Lock
import { UpdateLocksById } from '../../services/https/index';
import { message } from 'antd';
import axios from 'axios';
import './EditLockStyle.css'
interface EditLockProps {
  lock: Lock; // รับ prop lock ที่เป็น type Lock
  onUpdate: () => void;
}

const EditLock: React.FC<EditLockProps> = ({ lock, onUpdate }) => {
  const [values, setValues] = useState<Lock>(lock); // ใช้ lock จาก prop ในการกำหนดค่าเริ่มต้น

  useEffect(() => {
    setValues(lock); // อัพเดตค่าเมื่อ prop lock เปลี่ยนแปลง
  }, [lock]);

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "Price") {
      const cleanedValue = value.replace(/[^0-9.]+/g, '');
      const priceNumber = parseFloat(cleanedValue);
      setValues({
        ...values,
        [name]: isNaN(priceNumber) ? '' : priceNumber
      });
    } else {
      setValues({
        ...values,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values); // ตรวจสอบค่าที่แปลงแล้ว

    try {
      const response = await UpdateLocksById(values.Id, values);
      if (response) {
        message.success('ล็อคถูกอัปเดตเรียบร้อยแล้ว');
        onUpdate(); // เรียกฟังก์ชัน onUpdate หลังจากอัปเดตเสร็จสิ้น
      } else {
        message.error('ไม่สามารถอัปเดตล็อคได้');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating lock:', error.response?.data);
        message.error(`เกิดข้อผิดพลาด: ${error.response?.data?.message || 'ไม่สามารถอัปเดตล็อคได้'}`);
      } else {
        console.error('Error updating lock:', error);
        message.error('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label  >ID</label>
      <input 
        className="editLabel"
        name="Id" 
        value={values.Id} 
        disabled 
        required
      />


      <label >Price</label>
      <input 
        className="editLabel"
        name="Price" 
        type="number" 
        value={values.Price} 
        onChange={handleChanges} 
        required
      />

      <label >Size</label>
      <input 
        className="editLabel"
        name="Size" 
        value={values.Size} 
        onChange={handleChanges} 
        required
      />

      <button 
        className='buttonedit'
        type="button" 
        onClick={() => setValues(lock)} // Reset form to initial values
      >
        Default
      </button>
      <button className= "buttonedit" type="submit">Save</button>
    </form>
  );
};

export default EditLock;