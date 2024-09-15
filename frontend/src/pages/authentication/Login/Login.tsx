import React, { useEffect } from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '../../../services/https/index';
import { SignInInterface } from '../../../interfaces/SignIn';
import logo from '../../../assets/biglogo.png';
import user from '../../../assets/userlogin.png';
import './login.css';
import { Color } from 'antd/es/color-picker';

const SignInPages: React.FC = () => {
  useEffect(() => {
    const showLoginMessage = sessionStorage.getItem('showLoginMessage') === 'true';
    if (showLoginMessage) {
      message.info('กรุณาเข้าสู่ระบบก่อนทำการจอง!!');
      sessionStorage.removeItem('showLoginMessage'); // Clear the flag
    }
  }, []);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SignInInterface) => {
    let res = await SignIn(values);

    if (res.status === 200) {
      messageApi.success('Sign-in successful');
      localStorage.setItem('isLogin', 'true');
      localStorage.setItem('page', 'dashboard');
      localStorage.setItem('token_type', res.data.token_type);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('id', res.data.id);

      setTimeout(() => {
        location.href = '/';
      }, 2000);
    } else {
      messageApi.error(res.data.error);
    }
  };

  return (
    <div className="login-page22">
      {contextHolder}
      <div className="login-container22">
        <div className="login-left22">
          <img src={logo} alt="Easy Find Market Logo" className="logo22" />
        </div>
        <div className="login-right22">
          <h2>WELCOME</h2>
          <img src={user} className="profile_null_user" alt="User Placeholder" />
          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item 
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button22">
                เข้าสู่ระบบ
              </Button>
            </Form.Item>
            <Form.Item>
              <a onClick={() => navigate('/signup')} className="register-link22">
                ไม่มีบัญชี คลิกตรงนี้
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignInPages;
