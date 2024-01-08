import './BigButton.scss';

type Props = {
  text: string,
  onClick: (e: any) => void | Promise<void>,
}

export const BigButton: React.FC<Props> = ({text, onClick}) => {
  return (
    <button 
      type="submit" 
      className="BigButton"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
