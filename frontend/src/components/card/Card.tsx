import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Offcanvas from './Offcanvas';
function BasicExample() {
  return (
    <Card style={{ width: '12rem' }}>
      <Card.Img variant="top" src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg" />
      <Card.Body>
        <Card.Title>นวย</Card.Title>
        
        <Offcanvas/>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;