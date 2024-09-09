import { UsersInterface } from "../../interfaces/IUser";
import { GetUsersById } from "../../services/https/index";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './profile.css';
import { Avatar } from 'antd';
import { ShopsInterface } from '../../interfaces/IShop';
import { GetShopByUserId } from '../../services/https/shop';
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

    const [shop, setShop] = useState<ShopsInterface>();

    const getShop = async (userId: string) => {
        let res = await GetShopByUserId(userId);
        if (res) {
            setShop(res.data);
        }
    };

    useEffect(() => {
        if (userId) {
            getShop(userId);
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
                <Modal.Title>ข้อมูลผู้ใช้</Modal.Title>
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
                        
                        <div>ชื่อ: {user.FirstName}</div>
                        <div>นามสกุล: {user.LastName}</div>
                        <div>อีเมล: {user.Email}</div>
                        <div>เบอร์โทรศัพท์: {user.Tel}</div>
                        <div>เพศ: {user.GenderID}</div>
                    </div>
                ) : (
                    <div>Loading user data...</div>
                )}
                {/* Button aligned to the right */}
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
