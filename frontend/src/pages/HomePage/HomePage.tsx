// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from 'react-router-dom';
import { SmallButton } from '../../components/SmallButton';
import './HomePage.scss';
// import img1 from '../../assests/carousel/1.jpg';
// import img2 from '../../assests/carousel/2.jpg';
// import img3 from '../../assests/carousel/3.jpg';
// import img4 from '../../assests/carousel/4.jpg';



export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="HomePage">
      <div className="HomePage__background">
        <div className="HomePage__content">
          <h1 className="HomePage__title">FRIENDSHIP NEVER GOES OUT OF STYLE</h1>
            <SmallButton text="Shop" onClick={() =>navigate('/shop')} />
        </div>
      </div>
      
      {/* <Carousel 
        showStatus={false}
        autoPlay={true}
        interval={3000}
        showThumbs={false}
        transitionTime={1000}
      >
        <div>
            <img src={img1} alt="banner" className="HomePage__img" />
        </div>
        <div>
            <img src={img2} alt="banner" className="HomePage__img" />
        </div>
        <div>
            <img src={img3} alt="banner" className="HomePage__img HomePage__img--top" />
        </div>
        <div>
            <img src={img4} alt="banner" className="HomePage__img HomePage__img--right" />
        </div>
      </ Carousel> */}
    </div>
  )
}