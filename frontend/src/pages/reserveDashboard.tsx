import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetReservesById } from "../services/https/index";
import { ReservesInterface } from "../interfaces/IReserve";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ShopsInterface } from "../interfaces/IShop";
import { GetShopByUserId } from "../services/https/index";

function ReserveDashboard() {
  const navigate = useNavigate();
  const [reserves, setReserves] = useState<ReservesInterface[]>([]);
  const [shop, setShop] = useState<ShopsInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const userId = localStorage.getItem("id");

  const columns: ColumnsType<ReservesInterface> = [
    {
      title: "ลำดับ",
      key: "index",
      render: (text, record, index) => <>{index + 1}</>,
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
      // Set flex and minWidth for balanced spacing
      onCell: () => ({ style: { flex: 1, minWidth: 80 } }),
    },
    {
      title: "วันที่จอง",
      dataIndex: "date",
      key: "date",
      render: (date) => <>{dayjs(date).format("DD/MM/YYYY")}</>,
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 150 } }),
    },
    {
      title: "ร้านค้า",
      dataIndex: "shop_name",
      align: "center",
      key: "shop_name",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 150 } }),
    },
    {
      title: "ราคา",
      dataIndex: "total_price",
      key: "total_price",
      align: "right",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 100 } }),
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
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 150 } }),
    },
  ];

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

  const getReserves = async (shopId: number) => {
    if (!shopId) return; // Prevent fetching if shopId is undefined

    try {
      const res = await GetReservesById(shopId);
      if (res.status === 200) {
        setReserves(res.data);
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
    if (shop?.ID) {
      getReserves(shop?.ID);
    }
  }, [shop]);

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
          rowKey="ID"
          columns={columns}
          dataSource={reserves}
          style={{ width: "100%" }}
          pagination={{ pageSize: 10 }}
          
        />
      </div>
    </>
  );
}

export default ReserveDashboard;
