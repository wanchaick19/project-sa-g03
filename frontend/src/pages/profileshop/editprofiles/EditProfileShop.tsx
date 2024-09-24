import { useEffect, useState } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Upload,
  Select,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { ShopsInterface } from "../../../interfaces/IShop";
import { GetUsersById, UpdateUsersById } from "../../../services/https/index";
import { useNavigate, Link } from "react-router-dom";
import "./EditProfileShop.css"; // Assuming you have a CSS file for styling

function EditProfileShop() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // Fetch user data by ID and populate the form fields
  const getUserById = async (id: string) => {
    try {
      const res = await GetUsersByUserId(userId);
      if (res.status === 200) {
        form.setFieldsValue({
          NationalID: values.national_id,
          CategoryID: values.category_id,
          ShopName: values.shop_name,
          description: values.description,
          ShopImg: profileImageUrl,
          UserID: data.ID,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "ไม่พบข้อมูลผู้ใช้",
        });
        setTimeout(() => {
          navigate("/edit-profile-shop");
        }, 2000);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  };

  

  const onFinish = async (values: UsersInterface) => {
    try { 

    const reserveDetail = {
      
    };
      if (userId) {
      const res = await UpdateUsersById(userId, values);

      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setTimeout(() => {
          navigate("/edit-profile-shop");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: res.data.error,
        });
      }
      window.location.reload();
    }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      });
    }
  };

  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
  }, [userId]);

  // Function to handle file upload (if needed)
  const handleUpload = (file: any) => {
    // Handle file upload
    return false; // Return false to prevent automatic upload
  };

  return (
    <div className="user-edit-container">
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูลโปรไฟล์ร้านค้า</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={6} className="avatar-section">
              <Upload
                beforeUpload={handleUpload}
                listType="picture-card"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>แก้ไขรูปภาพ</Button>
              </Upload>
            </Col>
            <Col xs={24} lg={18}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                <Form.Item
                      label="เลขบัตรประจำตัวประชาชน"
                      name="national_id"
                      rules={[{ required: true, message: 'กรุณากรอกเลขบัตรประจำตัวประชาชน' }]}
                    >
                      <Input />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                <Form.Item
                      label="ชื่อร้านค้า"
                      name="shop_name"
                      rules={[{ required: true, message: 'กรุณากรอกชื่อร้านค้า' }]}
                    >
                      <Input />
                    </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
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
                <Col xs={24} sm={12}>
                <Form.Item
                  label="คำอธิบายร้านค้า"
                  name="description"
                  rules={[{ required: true, message: 'กรุณากรอกคำอธิบายร้านค้า' }]}
                >
                  <Input.TextArea />
                </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "20px" }}>
              <Form.Item>
                <Space>
                  <Link to="/">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>
                  </Link>
                  <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                    บันทึก
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

export default EditProfileShop;
