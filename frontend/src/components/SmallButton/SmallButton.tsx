import { Loader } from '../Loader';
import './SmallButton.scss';

type Props = {
  text: string,
  onClick: () => void,
  isLoading?: boolean,
  className?: string,
}

export const SmallButton: React.FC<Props> = ({
  text, 
  onClick, 
  isLoading = false,
  className = '',
}) => {
  return (
    <button 
      type="button" 
      className={`SmallButton ${className}`}
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
