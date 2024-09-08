import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Logo from '../assets/logo.png';

function Topbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage
    const loginStatus = localStorage.getItem('isLogin') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLogout = () => {
    // Clear login data from localStorage
    localStorage.removeItem('isLogin');
    localStorage.removeItem('token_type');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setIsLoggedIn(false);
    window.location.href = '/'; // Redirect to login page after logout
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'black' }}>
      <Container>
        <img
          id="pic"
          src={Logo}
          style={{ width: '4%' }}
          alt="Logo"
        />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: 'white' }}>หน้าหลัก</Nav.Link>
            <Nav.Link as={Link} to="/review" style={{ color: 'white' }}>รีวิว</Nav.Link>
            <Nav.Link as={Link} to="/map" style={{ color: 'white' }}>แผนที่</Nav.Link>
            <NavDropdown title={<span style={{ color: 'white' }}>เกี่ยวกับร้านค้า</span>} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/register" style={{ color: 'black' }}>ลงทะเบียนร้านค้า</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/reserve" style={{ color: 'black' }}>จองล็อคขายสินค้า</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {isLoggedIn ? (
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <Image
                    src={Logo} // Replace with actual avatar URL
                    roundedCircle
                    height="30"
                    alt="Profile"
                    style={{ border: '2px solid white' }}
                  />
                }
                id="profile-nav-dropdown"
                align="end"
                style={{ color: 'white' }}
              >
                <NavDropdown.Item as={Link} to="/profile" style={{ color: 'black' }}>โปรไฟล์</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/reserve_dashboard" style={{ color: 'black' }}>ประวัติการจองล็อค</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dashboard" style={{ color: 'black' }}>ประวัติการชำระเงิน</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} style={{ color: 'black' }}>ออกจากระบบ</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Button
              as={Link}
              to="/login"
              variant="outline-light"
              className="ms-auto"
              style={{ color: 'white', borderColor: 'white' }}
            >
              เข้าสู่ระบบ
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topbar;
