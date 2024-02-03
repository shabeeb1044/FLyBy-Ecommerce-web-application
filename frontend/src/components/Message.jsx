// import React from 'react'

// const Message = ({children}) => {
//   return <div>{children} </div>
// }

// export default Message

import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
