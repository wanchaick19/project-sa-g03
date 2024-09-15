import { Modal, Button, message } from "antd"; //จาก Ant Design
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewModalProps {
    isVisible: boolean;
    handleCancel: () => void;
}

const Modals: React.FC<ReviewModalProps> = ({ isVisible, handleCancel }) => {
    // สถานะของการให้คะแนน
    const [rating, setRating] = useState<number>(0);
    // สถานะของข้อความรีวิว
    const [reviewText, setReviewText] = useState<string>("");

    // ฟังก์ชันเพื่อแสดงดาวให้ผู้ใช้เลือก
    const renderStars = () => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className='star'
                color={index < rating ? "yellow" : "gray"}
                onClick={() => setRating(index + 1)} // เปลี่ยนค่าคะแนนเมื่อกดดาว
                style={{ cursor: 'pointer' }}
            />
        ));
    };

    // ฟังก์ชันสำหรับการยืนยันรีวิว
    const handleSubmit = () => {
        console.log("Rating:", rating);
        console.log("Review Text:", reviewText);
        // แสดงข้อความเมื่อกดยืนยัน
        message.success("รีวิวของคุณถูกบันทึกเรียบร้อยแล้ว!"); // แสดงข้อความสำเร็จ

        // ที่นี่คุณสามารถเพิ่มการทำงานเพื่อส่งข้อมูลไปยังเซิร์ฟเวอร์ได้
        handleCancel(); // ปิด modal หลังจากการยืนยัน
    };

    return (
        <Modal
            title="เขียนรีวิว"
            visible={isVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    ยืนยัน
                </Button>,
                <Button key="cancel" onClick={handleCancel}>
                    ยกเลิก
                </Button>
            ]}
        >
            <p>ให้คะแนนร้านค้า</p>
            {renderStars()} {/* เรียกใช้ฟังก์ชันเพื่อแสดงดาว */}
            <p>เขียนรีวิว</p>
            <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)} // อัพเดทสถานะเมื่อมีการพิมพ์
                rows={10}
                style={{ width: '100%', marginTop: '10px', padding: '5px' }} // กำหนดสไตล์เพิ่มเติมตามต้องการ
                placeholder="เขียนรีวิวของคุณที่นี่..."
            />
        </Modal>
    );
}

export default Modals;