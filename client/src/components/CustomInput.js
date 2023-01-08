import React from "react";
import { ChatAutoComplete, useMessageInputContext } from "stream-chat-react";

function CustomInput() {
  const { handleSubmit } = useMessageInputContext();
  return (
    <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
      <div className="str-chat__input-flat-wrapper">
        <div className="str-chat__input-flat--textarea-wrapper">
          <ChatAutoComplete />
        </div>
        <button className="btn btn-primary m-1" onClick={handleSubmit}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default CustomInput;
