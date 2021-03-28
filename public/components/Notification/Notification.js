import { Alert } from "reactstrap";

function NotifComp({type, msg}) {
  return <Alert color={type === 'error' ? 'danger' : 'primary'}>{msg || 'oops, something went wrong. Plz try again later'}</Alert>;
}

export default NotifComp;
