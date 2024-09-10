import { UsersInterface } from "../../interfaces/IUser";
import { GetUsersById } from "../../services/https/index";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './profile.css';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons'; // Import the EditOutlined icon

function UserInfo({ show, handleClose }: { show: boolean; handleClose: () => void }) {
    const [user, setUsers] = useState<UsersInterface>();
    const userId = localStorage.getItem("id");
    const navigate = useNavigate();

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

    // Function to handle navigation to the Edit Profile page and close the modal
    const handleEditProfile = () => {
        handleClose(); // Close the modal
        navigate('/edit-profile'); // Adjust the route as per your routing setup
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog">
            <Modal.Header closeButton>
                <Modal.Title>ข้อมูลผู้ใช้งาน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {user ? (
                    <div className='dataAboutME'>
                        <div className='avatar-container'>
                            <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                src={user.Profile}
                            />
                        </div>

                        {/* First Name and Last Name on the same row */}
                        <div className="row">
                            <div className="info-section">
                                <div className="info-label">ชื่อจริง</div>
                                <div className="info-value">{user.FirstName}</div>
                            </div>
                            <div className="info-section">
                                <div className="info-label">นามสกุล</div>
                                <div className="info-value">{user.LastName}</div>
                            </div>
                        </div>

                        {/* Email and Phone Number on the same row */}
                        <div className="row">
                            <div className="info-section">
                                <div className="info-label">อีเมล</div>
                                <div className="info-value">{user.Email}</div>
                            </div>
                            <div className="info-section">
                                <div className="info-label">เบอร์โทรศัพท์</div>
                                <div className="info-value">{user.Tel}</div>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="row">
                            <div className="info-section">
                                <div className="info-label">เพศ</div>
                                <div className="info-value">{(user.GenderID === 1) ? "ชาย" : "หญิง"}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading user data...</div>
                )}
                <button 
                    className="popup-button confirm align-right"
                    onClick={handleEditProfile}
                >
                    <EditOutlined style={{ marginRight: 8 }} />
                    แก้ไขข้อมูล
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default UserInfo;
