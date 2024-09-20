import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControlLabel, RadioGroup, Radio, Paper } from '@mui/material';
import QRCode from 'react-qr-code';
import { PlusOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import qr from "../../assets/qr.png";
import visa from "../../assets/visa.png";
import { Space, Button, Col, Row, Form, message } from "antd";
import { GetReservesDetailsByReserveId } from "../../services/https/index";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
import { ReservesInterface } from "../../interfaces/IReserve";

const Payments: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState<string>('promptpay');
    const [savedPayment, setSavedPayment] = useState(false);
    const [reservesDetails, setReservesDetails] = useState<ReserveDetailsInterface[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const navigate = useNavigate();
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
            fetchReservesDetails(parseInt(reserveId, 10)); // Convert reserveId to number
        }
    }, [reserveId]);

    const handleConfirm = () => {
            navigate(`/PaymentC/?reserveId=${reserveId}`);
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 2 }}>
                    <Paper elevation={5} sx={{ p: 2 }}>
                        <Typography variant="h6">วิธีการชำระเงิน</Typography>

                        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                            <FormControlLabel
                                value="promptpay"
                                control={<Radio />}
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
                                </Box>
                            )}

                            <FormControlLabel
                                value="creditcard"
                                control={<Radio />}
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
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" textAlign="center">ข้อมูลบัตรเครดิต</Typography>
                                <Box sx={{ mt: 2, mb: 2 }}>
                                    <label>ชื่อเจ้าของบัตรเครดิต</label><br />
                                    <input type="text" placeholder="Cardholder name" style={{ width: '95%', padding: '8px', margin: '8px 0' }} />

                                    <label>หมายเลขบัตร</label><br />
                                    <input type="text" placeholder="1234 5678 9012 3456" style={{ width: '95%', padding: '8px', margin: '8px 0' }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space', gap: '16px' }}>
                                        <Box>
                                            <label>วันหมดอายุ</label><br />
                                            <input type="text" placeholder="MM/YY" style={{ padding: '8px', margin: '8px 0' }} />
                                        </Box>
                                        <Box >
                                            <label>CVV</label><br />
                                            <input type="text" placeholder="123" style={{ padding: '8px', margin: '8px 0' }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <input
                                            type="checkbox"
                                            checked={savedPayment}
                                            onChange={() => setSavedPayment(!savedPayment)}
                                        />
                                        <label> บันทึกข้อมูลบัตรเครดิตเพื่อใช้ในรอบถัดไป</label>
                                    </Box>
                                </Box>
                            </Box>
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
                <Row justify="end">
                    <Col style={{ marginTop: "40px" }}>
                        <Form.Item>
                            <Space>
                                <Link to="/">
                                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                                        ยกเลิก
                                    </Button>
                                </Link>
                                <Button type="primary" icon={<PlusOutlined />} onClick={handleConfirm}>
                                    ยืนยัน
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
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
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
        fontSize: '20px',
        textAlign: 'left' as 'left',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: 'red',
        color: 'white',
        border: '5px',
        borderRadius: '10px',
    },
};