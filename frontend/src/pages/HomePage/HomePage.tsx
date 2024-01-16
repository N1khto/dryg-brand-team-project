import { useNavigate } from 'react-router-dom';
import { SmallButton } from '../../components/SmallButton';
import './HomePage.scss';


export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="HomePage">
      <div className="HomePage__background">        
      </div>

      <div className="HomePage__content">
        <h1 className="HomePage__title">FRIENDSHIP NEVER GOES OUT OF STYLE</h1>
        
        <div className="HomePage__button-desktop">
          <SmallButton text="Shop" onClick={() => navigate('/shop')} />
        </div>
        
        <button 
          type="button" 
          onClick={() => navigate('/shop')}
          className="HomePage__button-mobile"
        >
          Shop
        </button>
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
  );
};
