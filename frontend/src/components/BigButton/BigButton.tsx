import { useContext } from 'react';
import { Loader } from '../Loader';
import './BigButton.scss';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  text: string,
  onClick: (e: any) => void | Promise<void>,
}

export const BigButton: React.FC<Props> = ({text, onClick}) => {
  const {isLoading} = useContext(AuthContext);
  
  return (
    <button 
      type="submit" 
      className="BigButton"
      onClick={onClick}
    >
      
      {isLoading ? (
        <Loader />
      ) : (
        `${text}`
      )}
    </button>
  );
};
