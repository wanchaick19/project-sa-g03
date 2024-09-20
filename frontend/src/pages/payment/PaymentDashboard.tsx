import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message, Modal } from "antd";
import { PlusOutlined, ZoomInOutlined, DollarOutlined , HistoryOutlined ,ContainerOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ShopsInterface } from "../../interfaces/IShop";
import { GetShopByUserId } from "../../services/https/index";
import { PaymentInterface } from "../../interfaces/IPayment";
import { GetPaymentByShopId } from "../../services/https/index";

function PaymentDashboard() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<PaymentInterface[]>([]);
  const [shop, setShop] = useState<ShopsInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const userId = localStorage.getItem("id");

  const columns: ColumnsType<PaymentInterface> = [
    {
      title: "ลำดับ",
      key: "index",
      render: (text, record, index) => <>{index + 1}</>,
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 80 } }),
    },
    
    {
      title: "วันที่ชำระเงิน",
      dataIndex: "date",
      key: "date",
      render: (date) => <>{dayjs(date).format("DD/MM/YYYY")}</>,
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 120 } }),
    },
    {
      title: "ราคา",
      dataIndex: "total_price",
      key: "total_price",
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 80, paddingLeft: 10 } }), // Adjust padding
    },
  ];
  
  const handleOk = () => {
    navigate(`/`);
  };

  const getShop = async (userId: string) => {
    let res = await GetShopByUserId(userId);
    if (res) {
      setShop(res.data);
    }
  };

  useEffect(() => {
    if (userId) {
      getShop(userId);
    }
  }, [userId]);

  const getPayments = async (shopId: number) => {
    if (!shopId) return;

    try {
      const res = await GetPaymentByShopId(shopId);
      if (res.status === 200) {
        setPayments(res.data);
        console.log("Response data:", res.data);
      } else {
        setPayments([]);
        messageApi.open({
          type: "error",
          content: res.data.error || "Error fetching reserves data",
        });
      }
    } catch (error) {
      setPayments([]);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลการชำระเงิน",
      });
    }
  };

  useEffect(() => {
    if (shop?.ID) {
      getPayments(shop?.ID);
    }
  }, [shop]);

  return (
    <>
      {contextHolder}
      <Row justify="space-between" align="middle" >
        <Col >
        <div style={{marginLeft: 20 , marginTop: 30}}>
        <h2> <HistoryOutlined /> ประวัติการชำระเงิน</h2>
        </div>
        </Col>
      </Row>

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <div style={{ maxWidth: '80%', width: '100%' }}>
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={payments}
            style={{ width: "100%" }}
            pagination={{ pageSize: 4 }}
          />
        </div>
      </div>
    </>
  );
}

export default PaymentDashboard;