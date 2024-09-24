import Slide from '../../components/slide/Slide';
import Card from '../../components/card/Card';
import Footer from '../../components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';  // Import the CSS file where you added .home-background

function Home() {
  return (
    <div className="home-background"> {/* Apply the background class */}
      <Slide />
    </div>
  );
}

export default Home;
