import Alert from 'react-bootstrap/Alert';

function ReserveAlert() {
  return (
    <>
      {[
        'warning',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          กรุณาเลือกล็อคก่อนดำเนินการต่อ
        </Alert>
      ))}
    </>
  );
}

export default ReserveAlert;