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
import { UsersInterface } from "../../../interfaces/IUser";
import { GetUsersById, UpdateUsersById } from "../../../services/https/index";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"; // Assuming you have a CSS file for styling

function UserEdit() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // Fetch user data by ID and populate the form fields
  const getUserById = async (id: string) => {
    try {
      const res = await GetUsersById(id);
      if (res.status === 200) {
        form.setFieldsValue({
          email: res.data.email,
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          tel: res.data.tel,
          gender_id: res.data.gender?.ID,
          profile: res.data.profile,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "ไม่พบข้อมูลผู้ใช้",
        });
        setTimeout(() => {
          navigate("/edit-profile");
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
          navigate("/edit-profile");
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
        <h2>แก้ไขข้อมูลโปรไฟล์</h2>
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
                    label="อีเมล"
                    name="email"
                    rules={[
                      { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง !" },
                      { required: true, message: "กรุณากรอกอีเมล !" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="รหัสผ่าน"
                    name="password"
                    rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน !" }]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="ชื่อจริง"
                    name="first_name"
                    rules={[{ required: true, message: "กรุณากรอกชื่อ !" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="นามสกุล"
                    name="last_name"
                    rules={[{ required: true, message: "กรุณากรอกนามสกุล !" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="เบอร์โทรศัพท์"
                    name="tel"
                    rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์ !" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="เพศ"
                    name="gender_id"
                    rules={[{ required: true, message: "กรุณาเลือกเพศ !" }]}
                  >
                    <Select
                      defaultValue=""
                      style={{ width: "100%" }}
                      options={[
                        { value: "", label: "กรุณาเลือกเพศ", disabled: true },
                        { value: 1, label: "ชาย" },
                        { value: 2, label: "หญิง" },
                        { value: 3, label: "ไม่ระบุ" },
                        { value: 4, label: "อื่น ๆ" },
                      ]}
                    />
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

export default UserEdit;
