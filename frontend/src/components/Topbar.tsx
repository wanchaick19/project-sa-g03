import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'; // To use for the profile avatar
import Logo from '../assets/logo.png'; // Example: importing a logo image

function Topbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'black' }}> {/* Set background to black */}
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
            <Nav.Link as={Link} to="/" style={{ color: 'white' }}>หน้าหลัก</Nav.Link> {/* Set text color to white */}
            <Nav.Link as={Link} to="/review" style={{ color: 'white' }}>รีวิว</Nav.Link> {/* Set text color to white */}
            <Nav.Link as={Link} to="/map" style={{ color: 'white' }}>แผนที่</Nav.Link>
            <NavDropdown title={<span style={{ color: 'white' }}>เกี่ยวกับร้านค้า</span>} id="basic-nav-dropdown"> {/* Set dropdown text color */}
              <NavDropdown.Item as={Link} to="/register" style={{ color: 'black' }}>ลงทะเบียนร้านค้า</NavDropdown.Item> {/* Set dropdown item color */}
              <NavDropdown.Item as={Link} to="/reserve" style={{ color: 'black' }}>จองล็อคขายสินค้า</NavDropdown.Item> {/* Set dropdown item color */}
            </NavDropdown>
          </Nav>
          {/* Add a profile dropdown on the right */}
          <Nav className="ms-auto">
            <NavDropdown
              title={
                <Image
                  src={Logo} // Replace with actual avatar URL
                  roundedCircle
                  height="30"
                  alt="Profile"
                  style={{ border: '2px solid white' }} // Optionally add a border
                />
              }
              id="profile-nav-dropdown"
              align="end"
              style={{ color: 'white' }} // Set dropdown title color
            >
              <NavDropdown.Item as={Link} to="/profile" style={{ color: 'black' }}>โปรไฟล์</NavDropdown.Item> {/* Set dropdown item color */}
              <NavDropdown.Item as={Link} to="/reserve_dashboard" style={{ color: 'black' }}>ประวัติการจองล็อค</NavDropdown.Item> {/* Set dropdown item color */}
              <NavDropdown.Item as={Link} to="/dashboard" style={{ color: 'black' }}>ประวัติการชำระเงิน</NavDropdown.Item> {/* Set dropdown item color */}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout" style={{ color: 'black' }}>ออกจากระบบ</NavDropdown.Item> {/* Set dropdown item color */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Topbar;
