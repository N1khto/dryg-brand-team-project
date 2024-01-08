import './SmallButton.scss';

type Props = {
  text: string,
  onClick: () => void,
}

export const SmallButton: React.FC<Props> = ({text, onClick}) => {
  return (
    <button 
      type="button" 
      className="SmallButton"
      onClick={onClick}
    >
      {text}
    </button>
  )
}