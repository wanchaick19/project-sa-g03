import Slide from '../../components/slide/Slide';
import Foodzone from '../../components/zone/foodzone'; // Import Zone component
import Shopzone from '../../components/zone/shopzone'
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';  // Import the CSS file where you added .home-background

function Home() {
  return (
    <div className="home-background"> {/* Apply the background class */}
      <Slide />

      <section className="street-food-section"> {/* Use className instead of class */}
        <h2 className="section-title">✨ สำหรับผู้ที่หลงใหลในบรรยากาศ Street Food! ✨</h2>
        <p className="description">
          มาค้นหาของกินเล่นที่อร่อยในบรรยากาศชิลๆ เดินกินเพลินๆ หรือจะซื้อกลับบ้านก็สะดวก เพราะที่นี่มีร้านค้าหลากหลายหมุนเวียนกันมาเสิร์ฟความอร่อย ตั้งแต่ของปิ้ง ย่าง ทอด จนถึงของหวานมากมาย!
        </p>
        <p className="description">
          ไม่ว่าคุณจะเป็นสายเดินเล่นรับลม หรือชอบเลือกของกินจุกจิก ก็สามารถหาความอร่อยได้ตามใจชอบ รับรองว่าคุณจะฟินแน่นอน! 🍢🍔🌮
        </p>
      </section>

      <Foodzone />  {/* Use Zone component here */}

      <section className="street-food-section"> {/* Use className instead of class */}
        <h2 className="section-title">🛍️ ช็อปเพลิน เดินเล่นสบาย ในบรรยากาศ Outdoor! 🛍️</h2>
        <p className="description">
          สำหรับขาช็อปที่ชอบเดินหาของพร้อมเดินเที่ยวไปในตัว บรรยากาศแบบ Outdoor หรือยังไม่ได้คิดว่าจะซื้ออะไรดี ไม่มีร้านค้าประจำ เดินเจออะไรถูกใจก็ซื้ออันนั้นกลับบ้าน
        </p>
        <p className="description">
          การช็อปกึ่งเดินเที่ยวแบบนี้ เหมาะกับลูกค้าที่อยากมาเดินดูของเรื่อยๆ จนกว่าจะเจอของที่ถูกใจ เพราะมีสินค้าให้เลือกหลากหลาย ร้านค้ามากมาย ไม่ต้องเร่งรีบ ไม่มีเป้าหมายการมาซื้อที่ชัดเจน ถูกใจอะไรตอนนั้นก็ค่อยซื้อ ฟินๆไปจ้า~
        </p>
      </section>

      <Shopzone />
    </div>
  );
}

export default Home;