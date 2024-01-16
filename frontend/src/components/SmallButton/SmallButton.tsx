import { Loader } from '../Loader';
import './SmallButton.scss';

type Props = {
  text: string,
  onClick: () => void,
  isLoading?: boolean,
}

export const SmallButton: React.FC<Props> = ({text, onClick, isLoading = false}) => {
  return (
    <button 
      type="button" 
      className="SmallButton"
      onClick={onClick}
    >
      {isLoading ? (
        <Loader />
      ) : (
        text
      )}      
    </button>
  );
};
