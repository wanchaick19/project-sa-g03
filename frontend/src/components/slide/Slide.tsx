import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Slide.css'; // Import the CSS file

function Slide() {
  return (
    <div className="carousel-container">
      <Carousel className="carousel">
        <Carousel.Item interval={1000}>
          <img
            id="pic"
            src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>โซนของใช้</h3>
            <p>มีของใช้หลากหลายเหมาะกับทุกเทศกาล</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            id="pic"
            src="https://edtprod1.edtguide.com/edtguide/assets/SAVEONE-GO-2.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>โซนอาหาร</h3>
            <p>มีของกินมากมายให้เลือกช็อป</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            id="pic"
            src="https://edtprod1.edtguide.com/edtguide/assets/DSC09277_2023-11-02-105603_jocu.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>โซนที่นั่ง</h3>
            <p>มีทีา่นั่งรองรับมากมาย</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slide;