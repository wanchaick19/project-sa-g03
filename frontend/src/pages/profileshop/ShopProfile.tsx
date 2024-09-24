import React, { useState, useEffect } from 'react';
import { GetShopByUserId, GetReviewsByShopId } from "../../services/https/index";
import './ShopProfile.css';
import { Rate } from 'antd';
import { ShopsInterface } from "../../interfaces/IShop";
import { ReviewInterface } from "../../interfaces/IReview";
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';

function ShopProfile() {
    const [shop, setShop] = useState<ShopsInterface | null>(null);
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const userId = localStorage.getItem("id");
    const navigate = useNavigate();

    const handleEditProfileShop = () => {
        navigate('/edit-profile-shop');
    };

    const getShopData = async (userId: string) => {
        try {
            let res = await GetShopByUserId(userId);
            if (res) {
                setShop(res.data);
                await fetchRatingsForShop(res.data.ID);
            }
        } catch (error) {
            console.error("Error fetching shop data:", error);
        }
    };

    const calculateAverageRating = async (shopId: string) => {
        try {
            const reviewResponse = await GetReviewsByShopId(shopId);
            const reviews: ReviewInterface[] = reviewResponse.data;
            if (reviews.length === 0) return 0;
            const totalScore = reviews.reduce((acc, review) => acc + (review.Score ?? 0), 0);
            return totalScore / reviews.length;
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return 0;
        }
    };

    const fetchRatingsForShop = async (shopId: string) => {
        const averageRating = await calculateAverageRating(shopId);
        setRatings(prevRatings => ({ ...prevRatings, [shopId]: averageRating }));
    };

    useEffect(() => {
        if (userId) {
            getShopData(userId);
        }
    }, [userId]);

    return (
        <div className="shop-profile-container">
            <h2>โปรไฟล์ร้านค้า</h2>
            {shop ? (
                <div className="shop-profile-content">
                    <div className="shop-profile-left">
                    <img
                id="pic"
                src={shop.ShopImg || "/default-shop-image.jpg"}
                style={{ width: '70%', height: 'auto', marginBottom: '10px' }}
              />
                    
                        <div className="shop-rating">
                            <p>คะแนนร้านค้า</p>
                            <div className="stars">
                                <Rate disabled value={shop.ID !== undefined ? ratings[shop.ID] || 0 : 0} allowHalf />
                                <p>({shop.ID !== undefined && ratings[shop.ID] !== undefined ? (Math.round(ratings[shop.ID] * 10) / 10).toFixed(1) : 0} star)</p>
                            </div>
                        </div>
                    </div>

                    <div className="shop-profile-right">
                        <div className="shop-info">
                            <div className="info-label">เลขบัตรประชาชน</div>
                            <div className="info-value">{shop.NationalID || "-"}</div>
                        </div>
                        <div className="shop-info">
                            <div className="info-label">ชื่อร้านค้า</div>
                            <div className="info-value">{shop.ShopName || "ยังไม่มีชื่อร้านค้า"}</div>
                        </div>
                        <div className="shop-info">
                            <div className="info-label">ประเภทสินค้า</div>
                            <div className="info-value">{(shop.CategoryID === 1) ? "ร้านอาหาร": (shop.CategoryID === 2) ? "ร้านขายสินค้า"
                             : (shop.CategoryID === 3) ? "ร้านบริการ" : "ยังไม่มีร้านค้า"}</div>
                        </div>
                        <div className="shop-info">
                            <div className="info-label">คำอธิบายร้านค้า</div>
                            <div className="info-value">{shop.Description || "ยังไม่มีข้อมูล"}</div>
                        </div>
                        
                    </div>

                    
                </div>
            ) : (
                <div>Loading shop data...</div>
            )}
            <button 
                        className="popup-button confirm align-right"
                        onClick={handleEditProfileShop}
                    >
                        <EditOutlined  />
                        แก้ไขข้อมูล
                    </button>
        </div>
    );
}

export default ShopProfile;
