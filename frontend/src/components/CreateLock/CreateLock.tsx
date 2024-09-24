import { Form } from "react-bootstrap";
import "./CreateLockStyle.css";
import { ChangeEvent, useState } from "react";
import { CreateLock} from '../../services/https/index';
import { message } from "antd";


const createLock = () => {
    const [values, setValues] = useState({
        id: '',
        status: 'ว่าง',
        price: 0,
        size: ''
    });

    
    // handle input changes
    const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // แปลงค่าของ price จาก string เป็น number
        setValues({
            ...values,
            [name]: name === "price" ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(values);
    
        try {
            // เรียกใช้ CreateLock API
            const response = await CreateLock(values);
            console.log(response);  // ตรวจสอบ response ที่ได้จาก API
    
            if (response?.error) {
                // ถ้ามีข้อผิดพลาดแสดงข้อความ
                if (response.error === 'ล็อคนี้มีอยู่แล้ว') {
                    message.error('ล็อคนี้มีอยู่แล้วในระบบ');
                } else {
                    message.error(response.error);
                }
            } else {
                // ถ้าไม่มีข้อผิดพลาด ให้แสดงข้อความว่าล็อคถูกสร้างเรียบร้อยแล้ว
                message.success('ล็อคถูกสร้างเรียบร้อยแล้ว');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.error('Error creating lock:', error);
            message.error('เกิดข้อผิดพลาดในการสร้างล็อค');
        }
    };
    
    
    
    
    
    

    return (
        <div className="createlockform">
            <h1></h1>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="id">ชื่อล็อค</label>
                <input
                    className= "create-input"
                    type="text"
                    placeholder="Enter Lock Id"
                    name="id"
                    onChange={handleChanges}
                    required
                />

                <label htmlFor="status">สถานะ</label>
                <select
                    className="create-input"
                    name="status"
                    value={values.status}
                    onChange={handleChanges}
                    required
                >
                    <option value="ว่าง">ว่าง</option>
                    <option value="ไม่ว่าง">ไม่ว่าง</option>
                    <option value="ไม่พร้อมใช้งาน">ไม่พร้อมใช้งาน</option>
                </select>


                <label htmlFor="price">ราคา</label>
                <input
                    className= "create-input"
                    type="text"
                    placeholder="Enter Price"
                    name="price"
                    onChange={handleChanges}
                    required
                />

                <label htmlFor="size">ขนาด</label>
                <input
                    className= "create-input"
                    type="text"
                    placeholder="Enter Size"
                    name="size"
                    onChange={handleChanges}
                    required
                />

                <button className = "buttoncreate" type="reset">Reset</button>
                <button className = "buttoncreate" type="submit">Submit</button>
            </Form>
        </div>
    );
};

export default createLock;