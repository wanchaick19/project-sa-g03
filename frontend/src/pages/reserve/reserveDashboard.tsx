import { useState, useEffect } from "react";
import { Space, Table, Col, Row, Divider, message, Modal, DatePicker } from "antd";
import { PlusOutlined, DollarOutlined, HistoryOutlined, ContainerOutlined, ZoomInOutlined, DeleteOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetReservesByShopId, GetShopByUserId, GetReservesDetailsByReserveId, CancelLockById } from "../../services/https/index";
import { ReservesInterface } from "../../interfaces/IReserve";
import { Link,useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ShopsInterface } from "../../interfaces/IShop";
import { ReserveDetailsInterface } from "../../interfaces/IReserveDetails";
import { cancelReserveById } from "../../services/https/index";
import './reserveDashboard.css'; 

function ReserveDashboard() {

  //สำหรับเก็บข้อมูลการจอง
  const [reserves, setReserves] = useState<ReservesInterface[]>([]);

  //สำหรับเก็บรายละเอียดของแต่ละการจอง
  const [reservesDetails, setReservesDetails] = useState<ReserveDetailsInterface[]>([]);

  //สำหรับเก็บข้อมูลร้านค้า
  const [shop, setShop] = useState<ShopsInterface>();

  //สำหรับแสดงข้อความ
  const [messageApi, contextHolder] = message.useMessage();

  //สำหรับจัดการการแสดงป๊อปอัพ
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  
  //สำหรับเก็บข้อมูลการจองที่เลือก
  const [selectedReserve, setSelectedReserve] = useState<ReservesInterface | null>(null);

  //สำหรับเก็บข้อมูลที่ต้องการเฉพาะส่วน
  const [filteredReserves, setFilteredReserves] = useState<ReservesInterface[]>([]);

  //สำหรับเก็บวันที่สำหรับค้นหา
  const [searchDate, setSearchDate] = useState<string | null>(null);

  //สำหรับเก็บ id user  ที่ล็อคอินอยู่
  const userId = localStorage.getItem("id");

  //สำหรับ nav ไปหน้าอื่น
  const navigate = useNavigate();
  

  //กำหนด column ของตาราง
  const columns: ColumnsType<ReservesInterface> = [
    {
      title: "ลำดับ",
      key: "index",
      render: (text, record, index) => <>{index + 1}</>,
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      title: "วันที่จอง",
      dataIndex: "date",
      key: "date",
      render: (date) => <>{dayjs(date).format("DD/MM/YYYY")}</>,
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      title: "ร้านค้า",
      dataIndex: "shop_name",
      align: "center",
      key: "shop_name",
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      title: "ราคา",
      dataIndex: "total_price",
      key: "total_price",
      align: "center",
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        let statusColor = "";
        switch (status) {
          case "ยกเลิกแล้ว":
            statusColor = "red";
            break;
          case "ชำระเงินแล้ว":
            statusColor = "green";
            break;
          default:
            statusColor = "blue";
            break;
        }
  
        return <span style={{ color: statusColor }}>{status}</span>;
      },
      responsive: ["sm"],
      ellipsis: true,
    },
    {
      title: "ชำระเงิน",
      key: "id",
      align: "center",
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          {record.status === "ยังไม่ชำระเงิน" ? (
            <>
              <button
                className="popup-button cancel"
                onClick={() => showModal(record)}
              >
                <DollarOutlined /> ชำระเงิน
              </button>
              <button
                className="popup-button confirm"
                style={{ marginLeft: '10px'  }}
                onClick={() => showModalcancel(record)}
              >
                <DeleteOutlined /> 
              </button>
            </>
          ) :record.status === "ชำระเงินแล้ว" ? (
            <button
              className="details-button finish"
              onClick={() => showModal(record)}
            >
              <ZoomInOutlined /> ดูรายละเอียด
            </button>
          ) : (
            <button
              className="details-button cancel"
              onClick={() => showModal(record)}
            >
              <ZoomInOutlined /> ดูรายละเอียด
            </button>
          )}
        </div>
      ),
      responsive: ["sm"],
      ellipsis: true,
    },
  ];


  //สำหรับยกเลิกการจอง
  const handelCancelReserve = async (reserveId: number | undefined) => {
    if (!reserveId) return; // Check if reserveId is valid

    try {
      const data = {};
      await cancelReserveById(reserveId, data);
      await getReservesDetails(reserveId); // Fetch the reserve details

      reservesDetails.map((reserveDetail) => 
        CancelLockById(reserveDetail?.lock_id, data)
      )

      message.success("ยกเลิกการจองสำเร็จ");
      setIsModalVisible1(false); // Close modal on success

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (error) {
      message.error("เกิดข้อผิดพลาดในการยกเลิกการจอง");
    }
  };


  //สำหรับดึงรายละเอียดของแต่ละการจอง
  const getReservesDetails = async (reserveId: number) => {
    if (!reserveId) return;

    try {
      const res = await GetReservesDetailsByReserveId(reserveId);
      if (res.status === 200) {
        setReservesDetails(res.data);
      } else {
        setReservesDetails([]);
        messageApi.open({
          type: "error",
          content: res.data.error || "Error fetching reserves details",
        });
      }
    } catch (error) {
      setReservesDetails([]);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง",
      });
    }
  };


  //สำหรับแสดงป๊อปอัพรายละเอียดการจอง
  const showModal = async (record: ReservesInterface) => {
    setSelectedReserve(record);

    try {
      await getReservesDetails(record.id);
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง");
    }
    setIsModalVisible(true);
  };

  //สำหรับการกดชำระเงิน
  const handleOk = () => {
    navigate(`/Payments?reserveId=${selectedReserve.id}`);
  };

  //สำหรับปิดหน้ารายละเอียดการจองสำหรับชำระเงิน
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //สำหรับแสดงป๊อปอัพสำหรับการยกเลิกการจอง
  const showModalcancel = async (record: ReservesInterface) => {
    setSelectedReserve(record);

    try {
      await getReservesDetails(record.id);
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง");
    }

    setIsModalVisible1(true);
  };

  //สำหรับปิดป๊อปอัพหน้ารายละเอียดยกเลิกการจอง
  const handlecancelCancel = () => {
    setIsModalVisible1(false);
  };

  //สำหรับดึงข้อมูลร้าน
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

  //สำหรับดึงข้อมูลการจอง
  const getReserves = async (shopId: number) => {
    if (!shopId) return;

    try {
      const res = await GetReservesByShopId(shopId);
      if (res.status === 200) {
        setReserves(res.data);
        setFilteredReserves(res.data);
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


  //สำหรับการเลือกวันที่
  const handleDateChange = (date: any, dateString: string) => {
    setSearchDate(dateString);
    handleDateSearch(dateString);
  };

  //สำหรับค้นหาตามวันที่
  const handleDateSearch = (selectedDate: string | null) => {
    if (!selectedDate) {
      setFilteredReserves(reserves);
    } else {
      const filteredData = reserves.filter(reserve =>
        dayjs(reserve.date).format("DD/MM/YYYY") === selectedDate
      );
      setFilteredReserves(filteredData);
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="space-between" align="middle">
        <Col>
          <div style={{ marginLeft: 20, marginTop: 30 }}>
            <h2><HistoryOutlined /> ประวัติการจอง</h2>
          </div>
        </Col>
        <Col>
          <Space>
            <Link to="/reserve">
              <button className="popup-button confirm" style={{ marginRight: 30, marginTop: 30 }}>
                <PlusOutlined /> จองเพิ่ม
              </button>
            </Link>
          </Space>
        </Col>
      </Row>

      <Divider />

      {/*สำหรับใส่วันที่ในการค้นหา*/}
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col>
          <Space>
            <DatePicker
              format="DD/MM/YYYY"
              onChange={handleDateChange}
              value={searchDate ? dayjs(searchDate, "DD/MM/YYYY") : null}
              placeholder="เลือกวันที่เพื่อค้นหา"
            />
          </Space>
        </Col>
      </Row>

      <Table columns={columns} dataSource={filteredReserves} rowKey="id" />

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}

        //footer
        footer={[ 
          (selectedReserve?.status === "ยังไม่ชำระเงิน") ? (
        <button
        onClick={handleOk}
          className="popup-button confirm"
          style={{ marginTop: '20px' }}
        >
          <DollarOutlined /> ชำระเงิน
        </button> ) : (selectedReserve?.status === "ชำระเงินแล้ว") ? <p style={{color: "green"}}>ชำระเงินแล้ว</p> : <p style={{color: "red"}}>ยกเลิกแล้ว</p>,
        ]}
      >

        {/*header */}
        <div className="modal-header" style={{ paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '24px' }}><ContainerOutlined /> รายละเอียดการจอง</h2>
        </div>

        {selectedReserve && (
          <div style={{ marginTop: 30 }}>
            <p style={{ display: 'inline', marginRight: '50px' }}>
              <strong>วันที่จอง:</strong> {dayjs(selectedReserve.date).format("DD/MM/YYYY")}
            </p>
            <p style={{ display: 'inline', marginRight: '50px' }}>
              <strong>ร้านค้า:</strong> {selectedReserve.shop_name}
            </p>
            <p style={{ display: 'inline', textAlign: "right" }}>
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

      <Modal
        open={isModalVisible1}
        onCancel={handlecancelCancel}
        footer={[ 
          
        <button
          className="popup-button confirm"
          style={{ marginTop: '20px' }}
          onClick={() => handelCancelReserve(selectedReserve?.id)}
        >
          <CloseCircleOutlined /> ยกเลิกการจอง
        </button>  ,
        ]}
        
      >

<div className="modal-header" style={{ paddingBottom: '10px', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ fontSize: '24px' , color: "red"}}><ContainerOutlined /> ยกเลิกการจอง</h2>
        </div>
        {selectedReserve && (
          <div style={{ marginTop: 30 }}>
            <p style={{ display: 'inline', marginRight: '50px' }}>
              <strong>วันที่จอง:</strong> {dayjs(selectedReserve.date).format("DD/MM/YYYY")}
            </p>
            <p style={{ display: 'inline', marginRight: '50px' }}>
              <strong>ร้านค้า:</strong> {selectedReserve.shop_name}
            </p>
            <p style={{ display: 'inline', textAlign: "right" }}>
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
