import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'; 
import './Slide.css'; 

function Slide() {
  return (
    <div className="carousel-container">
      <Carousel className="carousel">
        <Carousel.Item interval={1000}>
          <Link to="/reserve"> 
            <img 
              id="pic"
              src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>จองล็อคขายสินค้า</h3>
              <p>คลิ๊กเลย</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item interval={500}>
          <Link to="/map">
            <img
              id="pic"
              src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>ดูร้านค้าทั้งหมดในตลาด</h3>
              <p>คลิ๊กเลย</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>

        <Carousel.Item>
          <Link to="/review">
            <img
              id="pic"
              src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>ดูรีวิวร้านค้าของตลาดทั้งหมด</h3>
              <p>คลิ๊กเลย</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Slide;
