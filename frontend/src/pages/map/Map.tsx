import React, { useState , useEffect} from 'react';
import {  Offcanvas, Card } from 'react-bootstrap';
import Logo from './../../assets/biglogoz.png'
import {ZoomInOutlined , ShopOutlined , ArrowRightOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GetMaps } from '../../services/https';
import {message} from "antd";
import './map.css'

interface Map {
  lock_id: string;
  shop_name: string;
  shop_img: string;
  description: string;
  rating: number;
}

// จำนวนแถวและคอลัมน์
const ROWS = 6;
const COLS = 10;

// ฟังก์ชันสร้าง lock_id
const generateLockId = (rowIndex: number, colIndex: number) => {
  const rowLetter = String.fromCharCode(65 + rowIndex);
  const columnNumber = (colIndex + 1).toString().padStart(2, '0');
  return `${rowLetter}${columnNumber}`;
};

const Map: React.FC = () => {

    const navigate = useNavigate();

    const handleReserveClick = () => {
        navigate('/reserve'); // Replace '/reserve' with the actual path to your reserve page
    };
  const [show, setShow] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Map | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClose = () => setShow(false);
  const handleShow = (shop: Map) => {
    setSelectedShop(shop);
    setShow(true);
  };

  const [map, setMap] = useState<Map[]>([]);

  const getMap = async () => {

    try {
      const res = await GetMaps();
      if (res.status === 200) {
        setMap(res.data);
      } else {
        setMap([]);
        messageApi.open({
          type: "error",
          content: res.data.error || "Error fetching reserves details",
        });
      }
    } catch (error) {
      setMap([]);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง",
      });
    }
  };

  useEffect(() => {
    getMap();
  }, []);

  return (

    
    <>
        <h2 className="map-title">
            <ShopOutlined /> แผนผังร้านค้าในตลาด
        </h2>

      <div className="map-container" style={{ display: 'grid', gridTemplateColumns: '30px repeat(10, 1fr)', gap: '20px' }}>
        {Array.from({ length: ROWS }).map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {/* แสดงแถว A, B, C,... */}
            <div className="row-header" style={{ textAlign: 'center', fontWeight: 'bold', alignSelf: 'center' }}>
              {String.fromCharCode(65 + rowIndex)}
            </div>
            {Array.from({ length: COLS }).map((_, colIndex) => {
              const lockId = generateLockId(rowIndex, colIndex);
              const shop = map.find(m => m.lock_id === lockId);

              return (
                <div className="cell" key={colIndex}>
                  {shop ? (
                    <Card className="card">
                      <Card.Img variant="top" src={shop.shop_img} alt={shop.shop_name} style={{ height: '100px', objectFit: 'cover' }} />
                      <Card.Body>
                        <Card.Title>{shop.shop_name}</Card.Title>
                        <Card.Text>คะแนน: {shop.rating}</Card.Text>
                        <button className='details-button cancel' onClick={() => handleShow(shop)}>
                        <ZoomInOutlined />
                        </button>
                        
                      </Card.Body>
                    </Card>
                  ) : (
                    <Card className="card">
                      <Card.Img variant="top" src={Logo} style={{ height: '100px', objectFit: 'cover' }} />
                      <Card.Body>
                        <Card.Title>ยังไม่มีร้านค้า</Card.Title>
                        <Card.Text>โปรดติดตาม</Card.Text>
                        <button className='details-button finish' onClick={handleReserveClick} >
                        <ArrowRightOutlined />ไปจอง
                        </button>
                      </Card.Body>
                    </Card>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedShop?.shop_name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedShop && (
            <>
              <img
                id="pic"
                src={selectedShop.shop_img}
                alt={selectedShop.shop_name}
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <p>{selectedShop.description}</p>
              <p>คะแนนร้านค้า: {selectedShop.rating}</p>
              <p>คะแนนร้านค้า: {selectedShop.lock_id}</p>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Map;
