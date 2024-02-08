import './ModalWrapper.scss';

interface WithModalProps {
  onClose: (value: boolean) => void;
}

const ModalWrapper = (WrappedComponent: React.FC<WithModalProps>) => {
  return ({ onClose }: WithModalProps) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose(false);
      }
    };

    return (
      <div className="ModalWrapper" onClick={(e) => handleClick(e)}>
        <WrappedComponent onClose={onClose} />
      </div>
    );
  };
};

export default ModalWrapper;
