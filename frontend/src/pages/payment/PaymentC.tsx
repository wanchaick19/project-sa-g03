import React, { useState, useEffect } from 'react';
import {
    Space, Button, Col, Row, Divider, Form, Input, Card,
    message, DatePicker, InputNumber, Upload
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { PaymentInterface } from "../../interfaces/IPayment";
import { CreatePayment, GetReservesByReseveId } from "../../services/https/index";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ReserveDetailsInterface } from '../../interfaces/IReserveDetails';
import { UpdateReserveStatus } from "../../services/https/index";

function PaymentC() {
    const navigate = useNavigate();
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();
    const [slipFileName, setSlipFileName] = useState<string>("");
    const [form] = Form.useForm();
    const [reserve, setReserve] = useState<ReserveDetailsInterface>();

    const query = new URLSearchParams(location.search);
    const reserveId = query.get('reserveId');

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


    const onFinish = async (values: PaymentInterface) => {
        const valuesWithReserveId = {
            Name: values.name,
            Date: values.date,
            TotalPrice: values.total_price,
            Slip: values.slip,
            ReserveID: reserve?.ID // Use the reserve ID from the state
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


    // Handle image upload
    const handleUpload = (file: any) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string; // Convert to base64 string
            form.setFieldsValue({ slip: base64String }); // Save base64 string to form field
            setSlipFileName(file.name); // Set file name
        };

        reader.readAsDataURL(file); // Read file as base64 string
        return false; // Prevent default upload behavior
    };

    return (
        <div style={styles.container}>
            {contextHolder}
            <Card style={styles.card}>
                <h2>โปรดกรอกข้อมูลการชำระเงิน</h2>
                <Divider />

                <Form form={form} name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Row gutter={[16, 0]}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="ชื่อบัญชี"
                                name="name"
                                rules={[{ required: true, message: "กรุณากรอกชื่อบัญชี !" }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        <Form.Item
                            label="วัน/เดือน/ปี ที่ชำระเงิน"
                            name="date"
                            rules={[{ required: true, message: "กรุณาเลือกวัน/เดือน/ปี ที่ชำระเงิน !" }]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        <Form.Item
                            label="จำนวนเงิน"
                            name="total_price"
                            rules={[{ required: true, message: "กรุณากรอกจำนวนเงิน !" }]}
                        >
                            <InputNumber min={0} defaultValue={0} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    {/* Upload Slip */}
                    <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                        <Form.Item
                            label="อัพโหลดหลักฐานการชำระเงิน"
                            name="slip"
                            rules={[{ required: true, message: "กรุณาอัพโหลดหลักฐานการชำระเงิน !" }]}
                        >
                            <Upload beforeUpload={handleUpload} listType="text" maxCount={1}>
                                <Button icon={<UploadOutlined />}>อัพโหลดหลักฐานการชำระเงิน</Button>
                            </Upload>
                            {slipFileName && <div>ชื่อไฟล์: {slipFileName}</div>}
                        </Form.Item>
                    </Col>

                    <Row justify="end">
                        <Col style={{ marginTop: "40px" }}>
                            <Form.Item>
                                <Space>
                                    <Link to="/Payments">
                                        <Button htmlType="button" style={{ marginRight: "10px" }}>
                                            ยกเลิก
                                        </Button>
                                    </Link>
                                    <Button type="primary" htmlType="submit" icon={<PlusOutlined />}
                                        style={{
                                            backgroundColor: 'red',
                                            borderColor: 'red',
                                            color: 'white',
                                        }}>
                                        ยืนยัน
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
}

export default PaymentC;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5'
    },
    card: {
        width: '600px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }
};
