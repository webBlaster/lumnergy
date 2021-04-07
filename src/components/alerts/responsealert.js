import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import "./responsealert.css";
import { RESPONSE_REMOVE_MESSAGE } from "../../constants.js";

const ResponseAlert = (props) => {
  const [response, setResponse] = useState({isResponseAvailable: false});

  let dispatch = useDispatch();

  useEffect(()=>{
    if (props.response) {
      setResponse(props.response);
      if (props.response.isResponseAvailable) {
        setTimeout(() =>dispatch({type: RESPONSE_REMOVE_MESSAGE }),4000)
      }
    }
  }, [props.response, dispatch]); 

  return (
    <Alert
      className="response-alert text-center"
      show={response.isResponseAvailable}
      variant={response.errors ? "danger" : "success"}
      transition={true}
    >
      <p>{response.message}</p>
    </Alert>
  );
};

export default ResponseAlert;
