import { Row, Col, Form, Input, Button, Select, Upload, message } from 'antd';
import './registershop.css'; // Import the CSS file
import logo from '/src/assets/biglogo.png';
import React, { useState , useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ShopsInterface } from '../../interfaces/IShop';
import { CreateShop, GetUsersByUserId } from '../../services/https';
import { UsersInterface } from '../../interfaces/IUser';

const Registershop = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin') === 'true';
    if (!loginStatus) {
      window.location.href = '/login';
    }
  }, []);

  const onFinish = async (values: ShopsInterface) => {
    let res = await GetUsersByUserId(userId)
    const data = res

    try {
      // Structure the form values correctly including the profile image and user ID
      const valuesWithImage = {
        NationalID: values.national_id,
        CategoryID: values.category_id,
        ShopName: values.shop_name,
        description: values.description,
        ShopImg: profileImageUrl,
        UserID: data.ID,
      };

      // Send the data to create a new shop
      let res = await CreateShop(valuesWithImage);
      if (res.status === 201) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setTimeout(() => {
          navigate("/");
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
        content: "Something went wrong!",
      });
    }
  };

  const handleUpload = (file: any) => {
    // Simulate uploading to server and getting a URL back
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Return false to prevent default upload behavior
    return false;
  };

  return (
    <div className="container1">
      {contextHolder}
      <div className="content-box1">
        <Row gutter={16} className="form-section1">
          {/* Left Section - Logo */}
          <Col span={8}>
            <div className="logo-section1">
              <img
                className="logo-image1"
                src={logo}
                alt="Logo"
              />
              <h2>ลงทะเบียนร้านค้า</h2>
            </div>
          </Col>

          {/* Right Section - Form */}
          <Col span={16}>
            <div className="form-fields1">
              <h2>กรอกข้อมูลร้านค้า</h2>
              <Form
                layout="vertical"
                onFinish={onFinish} // Set the onFinish handler to handle form submission
                initialValues={{
                  remember: true,
                }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="เลขบัตรประจำตัวประชาชน"
                      name="national_id"
                      rules={[{ required: true, message: 'กรุณากรอกเลขบัตรประจำตัวประชาชน' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="ชื่อร้านค้า"
                      name="shop_name"
                      rules={[{ required: true, message: 'กรุณากรอกชื่อร้านค้า' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="ประเภทร้านค้า"
                      name="category_id"
                      rules={[{ required: true, message: "กรุณาเลือกประเภทร้านค้า !" }]}
                    >
                      <Select
                        defaultValue=""
                        style={{ width: "100%" }}
                        options={[
                          { value: "", label: "กรุณาเลือกประเภทร้านค้า", disabled: true },
                          { value: 1, label: "ร้านอาหาร" },
                          { value: 2, label: "ร้านขายสินค้า" },
                          { value: 3, label: "ร้านบริการ" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="รูปโปรไฟล์ร้านค้า"
                      name="shop_img"
                      rules={[{ required: true, message: "กรุณาอัปโหลดรูปโปรไฟล์ !" }]}
                    >
                      <Upload
                        beforeUpload={handleUpload} // Handle file upload
                        listType="picture"
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>อัปโหลดรูปภาพ</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="คำอธิบายร้านค้า"
                  name="description"
                  rules={[{ required: true, message: 'กรุณากรอกคำอธิบายร้านค้า' }]}
                >
                  <Input.TextArea />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button className="custom-cancel1" htmlType="button">
                    ยกเลิก
                  </Button>
                  <Button className="custom-submit1" type="primary" htmlType="submit">
                    ต่อไป
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Registershop;
