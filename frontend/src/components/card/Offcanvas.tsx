import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        รายละเอียดร้านค้า
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ร้านของนวย</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <img
            id="pic"
            src="https://tatapi.tourismthailand.org/tatfs/Image/CustomPOI/Picture/P03018129_1.jpeg"
           
          />
          ร้านนี้มีแต่ของนวยๆ แล้วก็นวยๆ
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;