import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './toast.css'
const ToastMessageComponent = (props)=>{
  /**
   * This component is used to show the toast message for 2 secounds
   * props 
   * toastMessage: [string] the messaeg that we want to display
   * showToast :[bool] it tells to show or close the toast
   * closeToast :[function]  function that sets the showToast as false to make the toast autohide
   * delay (optional ) : its autohides the toast after some time in milliseconds
   * 
   * 
   * create state in the parent component  as  const [showToast, setShowToast] = useState(false);
   */
const {toastMessage,showToast,closeToast,delay=2000} = props;

return(
    <ToastContainer className="p-5 ">
    <Toast onClose={() => closeToast()} show={showToast}  className="toast-message" delay={delay} autohide >
      <Toast.Body>{toastMessage}</Toast.Body>
    </Toast>
  </ToastContainer>
)
    
}
export default ToastMessageComponent;