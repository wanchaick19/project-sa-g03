import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Slide.css'; // Import the CSS file
import Logo from '../assets/logo.png'

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
            <h3>หน้าที่หนึ่ง</h3>
            <p>อิอิ</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            id="pic"
            src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>หน้าทีสอง</h3>
            <p>อิอิ.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            id="pic"
            src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>หน้าที่สาม</h3>
            <p>อิอิ.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slide;
