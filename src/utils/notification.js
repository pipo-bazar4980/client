import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./notification.css"

toast.configure({
  position: toast.POSITION.BOTTOM_RIGHT,
})

export const notify = (msg) => {
  toast(`${msg}`)
}

