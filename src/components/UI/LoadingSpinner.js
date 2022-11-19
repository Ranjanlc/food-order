import classes from './LoadingSpinner.module.css';
import Modal from './Modal';

const LoadingSpinner = () => {
  return (
    <Modal>
      <div className={classes.spinner}></div>
    </Modal>
  );
};

export default LoadingSpinner;
