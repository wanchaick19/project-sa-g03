import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControlLabel, RadioGroup, Radio, Paper } from '@mui/material';
import QRCode from 'react-qr-code';
import { PlusOutlined, CheckOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import qr from "../../assets/qr.png";
import visa from "../../assets/visa.png";
import { Space, Button, Col, Row, Form, Modal, Input, message } from "antd";
import { GetReservesDetailsByReserveId, CreatePayment } from "../../services/https/index";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
import { UsersInterface } from '../../interfaces/IUser';
import { PaymentInterface } from '../../interfaces/IPayment';
import { UpdateReserveStatus, GetReservesByReseveId } from "../../services/https/index";

const Payments: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState<string>('promptpay');
    const [reservesDetails, setReservesDetails] = useState<ReserveDetailsInterface[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [creditCards, setCreditCards] = useState<string[]>([]);
    const [user, setUser] = useState<UsersInterface>();
    const [reserve, setReserve] = useState<ReserveDetailsInterface>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false); // state สำหรับ modal ยืนยันการชำระเงิน
    // const [newCard, setNewCard] = useState({ CardName: '', CardNumber: '', Exp: '', CVV: '' }); // เปลี่ยนชื่อฟิลด์
    const location = useLocation();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const query = new URLSearchParams(location.search);
    const reserveId = query.get('reserveId');


    useEffect(() => {
        const fetchReservesDetails = async (reserveId: number) => {
            if (!reserveId) return;

            try {
                const res = await GetReservesDetailsByReserveId(reserveId);
                if (res.status === 200) {
                    setReservesDetails(res.data);
                    const total = res.data.reduce((total, detail) => total + (detail.price || 0), 0);
                    setTotalPrice(total);
                } else {
                    setReservesDetails([]);
                    message.error(res.data.error || "Error fetching reserves details");
                }
            } catch (error) {
                setReservesDetails([]);
                message.error("เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง");
            }
        };

        if (reserveId) {
            fetchReservesDetails(parseInt(reserveId, 10));
        }
    }, [reserveId]);

    const getReserves = async (reserveId: string) => {
        try {
            const res = await GetReservesByReseveId(reserveId);
            setReserve(res.data);
        } catch (error) {
            messageApi.error('Error fetching shop data');
        }
    };

    useEffect(() => {
        if (reserveId) {
            getReserves(reserveId);
        }
    }, [reserveId]);


    const handleConfirm2 = async () => {
        if (!reserve) {
            messageApi.error("Reserve data is not available.");
            return;
        }
        const today = new Date();

        const valuesWithReserveId = {
            Date: today, // Assuming the 'date' is a field in your reserve data
            TotalPrice: reserve.TotalPrice, // Assuming 'total_price' is also a field in your reserve data
            ReserveID: reserve.ID // Use the reserve ID from the state
        };

        try {
            // Create payment first
            const res = await CreatePayment(valuesWithReserveId);

            if (res.status === 201) {
                // Update reserve status after successful payment
                if (reserve?.ID) {
                    await UpdateReserveStatus(reserve.ID.toString(), "ชำระเงินแล้ว");
                }

                // Show success message
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                });

                // Navigate to reserve dashboard after 2 seconds
                setTimeout(() => {
                    navigate("/reserve_dashboard");
                }, 2000);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "เกิดข้อผิดพลาดในการสร้างการชำระเงิน",
            });
        }
    };


    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    // ฟังก์ชันเปิด modal สำหรับการยืนยันการชำระเงิน
    const showConfirmModal = () => {
        setIsConfirmModalVisible(true);
    };

    // ฟังก์ชันปิด modal เมื่อยกเลิก
    const handleCancelConfirm = () => {
        setIsConfirmModalVisible(false);
    };





    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
                    <Paper elevation={5} sx={{ p: 2 }}>
                        <Typography variant="h6">วิธีการชำระเงิน</Typography>

                        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} >
                            <FormControlLabel
                                value="promptpay"
                                control={<Radio color="error" />}
                                label={
                                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                                        พร้อมเพย์
                                        <img src={qr} alt="PromptPay" width={80} height={70} style={{ marginLeft: 'auto' }} />
                                    </Box>
                                }
                            />

                            {paymentMethod === 'promptpay' && (
                                <Box sx={{ textAlign: 'center', mt: 2 }}>
                                    <div>
                                        <h2>คิวอาร์โค้ดสำหรับชำระเงิน</h2>
                                        <h2>สแกนเพื่อจ่าย</h2>
                                        <QRCode value={`https://example.com/pay?&amount=${totalPrice}`} size={128} level="H" />
                                        <p>ราคาทั้งหมด: {totalPrice.toFixed(2)} บาท</p>
                                    </div>
                                    <Row justify="end">
                                        <Col style={{ marginTop: "40px" }}>
                                            <Form.Item>
                                                <Space>
                                                    <Link to="/">
                                                        <Button htmlType="button" style={{ marginRight: "10px" }}>
                                                            ยกเลิก
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        type="primary"
                                                        icon={<PlusOutlined />}
                                                        onClick={showConfirmModal} // เมื่อคลิกจะเปิด modal
                                                        style={{
                                                            backgroundColor: 'red',
                                                            borderColor: 'red',
                                                            color: 'white',
                                                        }}
                                                    >
                                                        ยืนยัน
                                                    </Button>

                                                    {/* Modal สำหรับยืนยันการชำระเงิน */}


                                                    <Modal
                                                        title={
                                                            <Box display="flex" alignItems="center">
                                                                <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                                                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                                    ยืนยันการชำระเงิน
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        visible={isConfirmModalVisible}
                                                        onOk={handleConfirm2}
                                                        onCancel={handleCancelConfirm}
                                                        centered
                                                        okText="ยืนยัน"
                                                        cancelText="ยกเลิก"
                                                        okButtonProps={{
                                                            style: { backgroundColor: 'red', borderColor: 'red', color: '#fff' },
                                                        }}
                                                        cancelButtonProps={{
                                                            style: { color: '#ff4d4f', borderColor: '#ff4d4f' },
                                                        }}
                                                    >
                                                        <Box textAlign="center" py={3}>
                                                            <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">
                                                                <CheckOutlined style={{ marginRight: 8, color: '#52c41a', fontSize: '24px' }} />
                                                                คุณแน่ใจหรือไม่ว่าต้องการยืนยันการชำระเงิน?
                                                            </Typography>
                                                        </Box>
                                                    </Modal>
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Box>
                            )}

                            <FormControlLabel
                                value="creditcard"
                                control={<Radio color="error" />}
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography>บัตรเครดิต/บัตรเดบิต</Typography>
                                        <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                                <img src={visa} alt="Visa" width={120} height={30} style={{ marginLeft: 'auto' }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                }
                            />
                        </RadioGroup>

                        {paymentMethod === 'creditcard' && (

                            <Button type="primary" danger onClick={showModal}>
                                เพิ่มบัตร
                            </Button>


                        )}
                    </Paper>
                </Box>
            </div>


            <div style={styles.summaryContainer}>
                <h2>รายการทั้งหมด</h2>
                {reservesDetails.map((detail, index) => (
                    <p key={index}>
                        {detail.lock_id} &nbsp;: &nbsp; &nbsp; &nbsp; {detail.price.toFixed(2)}
                    </p>))}
                <h2>ราคาทั้งหมด&nbsp;: &nbsp; &nbsp; &nbsp;{totalPrice.toFixed(2)} บาท</h2>

            </div>

            <Modal
                title="เพิ่มบัตรเครดิต"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={showConfirmModal}
                okButtonProps={{
                    style: { backgroundColor: 'red', borderColor: '#red', color: '#fff' }, // Change the color here
                }}
            >
                <Form layout="vertical">
                    <Form.Item
                        label="ชื่อบัตรเครดิต"
                        name="name"
                        rules={[{ required: true, message: "กรุณากรอกชื่อบัตรเครดิต !" }]}
                    >
                        <Input placeholder="Nand Gate"
                        />
                    </Form.Item>

                    <Form.Item
                        label="หมายเลขบัตร"
                        name="card"
                        rules={[{ required: true, message: "กรุณากรอกหมายเลขบัตรเครดิต !" }]}>
                        <Input
                            placeholder="1234 5678 9012 3456"
                        />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="วันหมดอายุ"
                                name="Exp"
                                rules={[{ required: true, message: "กรุณากรอกวันที่บัตรหมดอายุ !" }]}>
                                <Input
                                    placeholder="MM/YY"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                            label="CVV"
                            name="cvv"
                            rules={[{ required: true, message: "กรุณากรอก !" }]}>
                                <Input
                                    placeholder="123"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                {/* Inner Confirm Modal */}
                <Modal
                    title={
                        <Box display="flex" alignItems="center">
                            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                ยืนยันการชำระเงิน
                            </Typography>
                        </Box>
                    }
                    visible={isConfirmModalVisible}
                    onOk={handleConfirm2}
                    onCancel={handleCancelConfirm}
                    centered
                    okText="ยืนยัน"
                    cancelText="ยกเลิก"
                    okButtonProps={{
                        style: { backgroundColor: 'red', borderColor: 'red', color: '#fff' },
                    }}
                    cancelButtonProps={{
                        style: { color: '#ff4d4f', borderColor: '#ff4d4f' },
                    }}
                >
                    <Box textAlign="center" py={3}>
                        <Typography variant="body1" display="flex" justifyContent="center" alignItems="center">
                            <CheckOutlined style={{ marginRight: 8, color: '#52c41a', fontSize: '24px' }} />
                            คุณแน่ใจหรือไม่ว่าต้องการยืนยันการชำระเงิน?
                        </Typography>
                    </Box>
                </Modal>
            </Modal>

        </div>
    );
};

export default Payments;

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
    },
    formContainer: {
        width: '80%',
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
    },
    summaryContainer: {
        width: '35%',
        padding: '20px',
        background: '#ffffff',
        borderRadius: '8px',
    },
};