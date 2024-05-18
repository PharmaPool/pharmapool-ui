import React from 'react'

function CurrentUserChat({message}) {
  return (
    <div className="current_user">
      <div className="user_body">
        <p>
          {message}
        </p>
      </div>
    </div>
  );
}

export default CurrentUserChat
