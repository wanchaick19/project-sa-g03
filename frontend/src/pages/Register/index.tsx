import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Row,
  Col,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../services/https/index";
import { UsersInterface } from "../../interfaces/IUser";
import logo from "../../assets/biglogo.png";
import "./index.css";

function SignUpPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const onFinish = async (values: UsersInterface) => {
    try {
      // Include the uploaded image URL in the form values
      const valuesWithImage = { ...values, profile: profileImageUrl };

      let res = await CreateUser(valuesWithImage);
      if (res.status === 201) {
        messageApi.open({
          type: "success",
          content: res.data.message,
        });
        setTimeout(() => {
          navigate("/login");
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

  // Handle image upload
  const handleUpload = (file: any) => {
    // Simulate uploading to server and getting a URL back
    // Replace this with actual file upload logic if needed
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Return false to prevent default upload behavior
    return false;
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" align="middle" className="register">
        <Card className="card-register" style={{ width: 600 }}>
          <Row align="middle" justify="center">
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
              <img alt="logo" src={logo} className="images-logo-register" />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h2 className="header-register">สมัครบัญชีผู้ใช้</h2>
              <Form name="basic" layout="vertical" onFinish={onFinish} autoComplete="off">
                <Row gutter={[16, 0]}>
                  <Col xs={24}>
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

                  <Col xs={24}>
                    <Form.Item
                      label="รหัสผ่าน"
                      name="password"
                      rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน !" }]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={12}>
                    <Form.Item
                      label="ชื่อจริง"
                      name="first_name"
                      rules={[{ required: true, message: "กรุณากรอกชื่อ !" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      label="นามสกุล"
                      name="last_name"
                      rules={[{ required: true, message: "กรุณากรอกนามสกุล !" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={12}>
                  <Form.Item
                        label="เบอร์"
                        name="tel"
                        rules={[
                          { required: true, message: "กรุณากรอกเบอร์โทรศัพท์!" },
                          { pattern: /^\d{10}$/, message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก" }
                        ]}
                      >
                        <Input/>
                      </Form.Item>

                  </Col>
                  <Col xs={12}>
                    <Form.Item
                      label="รูปโปรไฟล์"
                      name="profile"
                      rules={[{ required: true, message: "กรุณาอัปโหลดรูปโปรไฟล์ !" }]}
                    >
                      <Upload
                        beforeUpload={handleUpload}
                        listType="picture"
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>อัปโหลดรูปภาพ</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={24} lg={12}>
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

                  <Col xs={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-button22"
                        style={{ marginBottom: 20 }}
                      >
                        ลงทะเบียน
                      </Button>
                    
                      <a className= "register-link22" onClick={() => navigate("/login")}>มีบัญชีอยู่แล้ว? !</a>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
}

export default SignUpPages;
