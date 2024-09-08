import {
    Button,
    Card,
    Form,
    Input,
    message,
    Row,
    Col,
    Select,
    Flex,
  } from "antd";
  import { useNavigate } from "react-router-dom";
  import { CreateUser } from "../../services/https/index";
  import { UsersInterface } from "../../interfaces/IUser";
  import logo from "../../assets/logo.png";
  import './index.css';
  
  function SignUpPages() {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
  
    const onFinish = async (values: UsersInterface) => {
      try {
        let res = await CreateUser(values);
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
  
    return (
      <>
        {contextHolder}
        <Flex justify="center" align="center" className="login">
          <Card className="card-login" style={{ width: 600 }}>
            <Row align="middle" justify="center">
              <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                <img alt="logo" src={logo} className="images-logo" />
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h2 className="header">สมัครบัญชีผู้ใช้</h2>
                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        label="อีเมล"
                        name="email"
                        rules={[
                          { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง !" },
                          { required: true, message: "กรุณากรอกอีเมล !" }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
  
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="ชื่อจริง"
                        name="first_name"
                        rules={[{ required: true, message: "กรุณากรอกชื่อ !" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="เบอร์"
                        name="tel"
                        rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์ !" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label="รูป"
                        name="profile"
                        rules={[{ required: true, message: "กรุณากรอกข้อมูลรูป !" }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
  
                  <Row gutter={[16, 0]}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
  
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ marginBottom: 20 }}
                        >
                          ลงทะเบียน
                        </Button>
                        หรือ <a onClick={() => navigate("/login")}>มีบัญชีอยู่แล้ว? !</a>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
        </Flex>
      </>
    );
  }
  
  export default SignUpPages;
  