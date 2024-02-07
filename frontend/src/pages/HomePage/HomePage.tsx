import { useNavigate } from 'react-router-dom';
import { SmallButton } from '../../components/SmallButton';
import './HomePage.scss';


export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="HomePage">
      <div className="HomePage__background" />        

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
    </div>
  );
};
