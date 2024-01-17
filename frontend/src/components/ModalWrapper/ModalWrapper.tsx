import './ModalWrapper.scss';

interface WithModalProps {
  onClose: (value: boolean) => void;
}

const ModalWrapper = (WrappedComponent: React.FC<WithModalProps>) => {
  return ({ onClose }: WithModalProps) => {
    return (
      <div className="ModalWrapper">
          <WrappedComponent onClose={onClose} />
      </div>
    );
  };
};


export default ModalWrapper;