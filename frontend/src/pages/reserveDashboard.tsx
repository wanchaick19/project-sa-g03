import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetReserves } from "../services/https/index"; // Ensure you are using the correct service for reserves
import { ReservesInterface } from "../interfaces/IReserve";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function ReserveDashboard() {
  const navigate = useNavigate();
  const [reserves, setReserves] = useState<ReservesInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const columns: ColumnsType<ReservesInterface> = [
    {
      title: "ลำดับ",
      key: "index",
      render: (text, record, index) => <>{index + 1}</>,
      width: 80,
      align: "center",
    },
    {
      title: "วันที่จอง",
      dataIndex: "date", // Ensure this matches the correct field in your API response
      key: "date",
      render: (date) => <>{dayjs(date).format("DD/MM/YYYY")}</>, // Format date correctly
      width: 150,
      ellipsis: true,
      responsive: ["sm"],
    },
    {
      title: "ร้านค้า",
      key: "shop",
      render: (record) => <>{record?.shop?.shop_name || record?.shop?.shop_id}</>, // Adjust based on actual API structure
      width: 150,
      ellipsis: true,
      responsive: ["sm"],
    },
    {
      title: "ราคา",
      dataIndex: "total_price", // Ensure this matches the correct field in your API response
      key: "total_price",
      width: 100,
      ellipsis: true,
      align: "right",
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/reservedetails/${record.ID}`)}
        >
          ดูรายละเอียด
        </Button>
      ),
      width: 150,
    },
  ];

  const getReserves = async () => {
    try {
      const res = await GetReserves();

      if (res.status === 200) {
        setReserves(res.data); // Ensure the response data format matches your ReservesInterface
      } else {
        setReserves([]);
        messageApi.open({
          type: "error",
          content: res.data.error || "Error fetching reserves data",
        });
      }
    } catch (error) {
      setReserves([]);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลการจอง",
      });
    }
  };

  useEffect(() => {
    getReserves();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ประวัติการจอง</h2>
        </Col>

        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/reserve">
              <Button type="primary" icon={<PlusOutlined />}>
                จองเพิ่ม
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID" // Ensure this matches a unique identifier field in your data
          columns={columns}
          dataSource={reserves}
          style={{ width: "100%" }}
          pagination={{ pageSize: 10 }} // Adjusts pagination size as needed
          scroll={{ x: "max-content" }} // Allows table to scroll horizontally based on content
        />
      </div>
    </>
  );
}

export default ReserveDashboard;
