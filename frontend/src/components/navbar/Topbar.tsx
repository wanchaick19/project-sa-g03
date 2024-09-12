import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Logo from '../../assets/5.png';
import UserInfo from '../profile/Profile'; // นำเข้า UserInfo component
import { UsersInterface } from '../../interfaces/IUser';
import { GetUsersById } from "../../services/https/index";
import './Topbar.css'; // Import the CSS file
import { ShopOutlined , HomeOutlined , LoginOutlined , HistoryOutlined,  LogoutOutlined,
    EnvironmentOutlined, CommentOutlined, ContactsOutlined, CreditCardOutlined, CodepenOutlined} from '@ant-design/icons';

function Topbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfile, setShowProfile] = useState(false); // สถานะสำหรับการแสดงป็อปอัพ

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLogin') === 'true';
        setIsLoggedIn(loginStatus);
    }, []);

    const [user, setUsers] = useState<UsersInterface | null>();
    const userId = localStorage.getItem("id");

    const getUsers = async (userId: string) => {
        let res = await GetUsersById(userId);
        if (res) {
            setUsers(res.data);
        }
    };

    useEffect(() => {
        if (userId) {
            getUsers(userId);
        }
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('token_type');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setIsLoggedIn(false);
        window.location.href = '/'; // Redirect to login page after logout
    };

    const handleShowProfile = () => setShowProfile(true);
    const handleCloseProfile = () => setShowProfile(false);

    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: 'black' }}>
                <Container>
                    <img id="pic" src={Logo} style={{ width: '5%' }} alt="Logo" />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" style={{ color: 'white' }}><HomeOutlined /> หน้าหลัก</Nav.Link>
                            <Nav.Link as={Link} to="/review" style={{ color: 'white' }}><CommentOutlined /> รีวิว</Nav.Link>
                            <Nav.Link as={Link} to="/map" style={{ color: 'white' }}><EnvironmentOutlined /> แผนที่</Nav.Link>
                            <NavDropdown title={<span style={{ color: 'white' }}> <ShopOutlined /> เกี่ยวกับร้านค้า</span>} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/register" style={{ color: 'black' }}><ShopOutlined /> ลงทะเบียนร้านค้า</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/reserve" style={{ color: 'black' }}><CodepenOutlined /> จองล็อคขายสินค้า</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                        {isLoggedIn ? (
                            <Nav className="ms-auto">
                                <NavDropdown
                                    title={
                                        <Image
                                            src={user?.Profile} // Replace with actual avatar URL
                                            roundedCircle
                                            height="30"
                                            width="30" // Set both height and width to fit the image
                                            alt="Profile"
                                            style={{ 
                                                border: '2px solid white', 
                                                objectFit: 'cover' // Ensures the image covers the area without distortion
                                            }}
                                        />
                                    }
                                    id="profile-nav-dropdown"
                                    align="end"
                                    style={{ color: 'white' }}
                                >
                                    <NavDropdown.Item onClick={handleShowProfile} style={{ color: 'black' }}><ContactsOutlined /> โปรไฟล์</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/shop_profile" style={{ color: 'black' }}><ShopOutlined /> โปรไฟล์ร้านค้า</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/reserve_dashboard" style={{ color: 'black' }}><HistoryOutlined /> ประวัติการจองล็อค</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/dashboard" style={{ color: 'black' }}><CreditCardOutlined /> ประวัติการชำระเงิน</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout} style={{ color: 'black' }}><LogoutOutlined /> ออกจากระบบ</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Button
                                as={Link}
                                to="/login"
                                variant="outline-light"
                                className="ms-auto login-button" // Added CSS class here
                            >
                                <LoginOutlined /> เข้าสู่ระบบ
                            </Button>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <UserInfo show={showProfile} handleClose={handleCloseProfile} />
        </>
    );
}

export default Topbar;
