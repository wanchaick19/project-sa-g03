import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message, Modal } from "antd";
import { PlusOutlined, ZoomInOutlined, DollarOutlined , HistoryOutlined ,ContainerOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetReservesByShopId } from "../../services/https/index";
import { ReservesInterface } from "../../interfaces/IReserve";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ShopsInterface } from "../../interfaces/IShop";
import { GetShopByUserId } from "../../services/https/index";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
import { GetReservesDetailsByReserveId } from "../../services/https/index";

function ReserveDashboard() {
  const navigate = useNavigate();
  const [reserves, setReserves] = useState<ReservesInterface[]>([]);
  const [reservesDetails, setReservesDetails] = useState<ReserveDetailsInterface[]>([]);
  const [shop, setShop] = useState<ShopsInterface>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReserve, setSelectedReserve] = useState<ReservesInterface | null>(null);
  const userId = localStorage.getItem("id");

  const columns: ColumnsType<ReservesInterface> = [
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
      title: "วันที่จอง",
      dataIndex: "date",
      key: "date",
      render: (date) => <>{dayjs(date).format("DD/MM/YYYY")}</>,
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 120 } }),
    },
    {
      title: "ร้านค้า",
      dataIndex: "shop_name",
      align: "center",
      key: "shop_name",
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 100, paddingRight: 20 } }), // Adjust padding
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
    {
      title: "รายละเอียดการจอง",
      key: "id",
      align: "center",
      render: (record) => (
        <button
          className="popup-button cancel"
          style={{ marginTop: '20px' }}
          onClick={() => showModal(record)}
        >
          <ZoomInOutlined /> ดูรายละเอียด
        </button>
      ),
      responsive: ["sm"],
      ellipsis: true,
      onCell: () => ({ style: { flex: 1, minWidth: 150 } }),
    },
  ];

  const getReservesDetails = async (reserveId: number) => {
    if (!reserveId) return;

    try {
      const res = await GetReservesDetailsByReserveId(reserveId);
      if (res.status === 200) {
        setReservesDetails(res.data); // Update state with fetched details
      } else {
        setReservesDetails([]); // Clear details if error
        messageApi.open({
          type: "error",
          content: res.data.error || "Error fetching reserves details",
        });
      }
    } catch (error) {
      setReservesDetails([]); // Clear details on error
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง",
      });
    }
  };

  const showModal = async (record: ReservesInterface) => {
    setSelectedReserve(record);

    try {
      await getReservesDetails(record.id); // Await details fetching
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง");
    }

    setIsModalVisible(true); // Show modal after setting details
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const getReserves = async (shopId: number) => {
    if (!shopId) return;

    try {
      const res = await GetReservesByShopId(shopId);
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
      <Row justify="space-between" align="middle" >
        <Col >
        <div style={{marginLeft: 20 , marginTop: 30}}>
        <h2> <HistoryOutlined /> ประวัติการจอง</h2>
        </div>
          
        </Col>

        <Col>
          <Space>
            <Link to="/reserve">
              <button className="popup-button confirm" style={{marginRight: 30 , marginTop: 30}} >
              <PlusOutlined /> จองเพิ่ม
              </button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <div style={{ maxWidth: '80%', width: '100%' }}>
          <Table
            rowKey="ID"
            columns={columns}
            dataSource={reserves}
            style={{ width: "100%" }}
            pagination={{ pageSize: 4 }}
          />
        </div>
      </div>

      {/* Modal for showing reserve details */}
      <Modal
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <button className="popup-button confirm" style={{ marginTop: '20px' }} onClick={handleOk} key="pay">
          <DollarOutlined /> ชำระเงิน
        </button>,
      ]}
    >
      <div className="modal-header" style={{ paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
        <h2 style={{ fontSize: '24px' }}> <ContainerOutlined /> รายละเอียดการจอง</h2> {/* Reduced font size */}
      </div>

      {selectedReserve && (
        <div style={{ marginTop: 30 }}>
          <p style={{ display: 'inline', marginRight: '50px' }}>
            <strong>วันที่จอง:</strong> {dayjs(selectedReserve.date).format("DD/MM/YYYY")}
          </p>
          <p style={{ display: 'inline', marginRight: '50px' }}>
            <strong>ร้านค้า:</strong> {selectedReserve.shop_name}
          </p>
          <p style={{ display: 'inline', textAlign: "right"}}>
            <strong>ราคา:</strong> {selectedReserve.total_price} <strong>บาท</strong> 
          </p>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            {reservesDetails.map((detail, index) => (
              <p key={index}>
                <strong>ล็อคที่: {index + 1}:</strong> {detail?.lock_id} - <strong>ราคา: </strong> {detail?.price} <strong>บาท</strong>
              </p>
            ))}
          </div>
        </div>
      )}
    </Modal>
    </>
  );
}

export default ReserveDashboard;
