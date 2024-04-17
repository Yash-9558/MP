import React, { useEffect, useReducer, useRef, useState } from "react";
import classes from "./index.module.css";
import Input from "../../../Input";
import Button from "../../../Button";
import { nameReducer, descriptionReducer } from "../../../../reducers";
import BasicRating from "../../../Rating";
import { addReview } from "../../../../utils/api";

function Form(props) {
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const ratingRef = useRef(null);

  const [formIsValid, setFormIsValid] = useState(false);

  const [titleState, dispatchTitle] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });
  const [messageState, dispatchMessage] = useReducer(descriptionReducer, {
    value: "",
    isValid: null,
  });

  const titleChangeHandler = (event) => {
    dispatchTitle({
      type: "USER_INPUT",
      value: event.target.value.trimStart(),
    });
  };
  const messageChangeHandler = (event) => {
    dispatchMessage({
      type: "USER_INPUT",
      value: event.target.value.trimStart(),
    });
  };

  // this will run on input gets out from focus
  const validateTitleHandler = () => dispatchTitle({ type: "INPUT_BLUR" });
  const validateMessageHandler = () => dispatchMessage({ type: "INPUT_BLUR" });

  const { isValid: titleIsValid } = titleState;
  const { isValid: messageIsValid } = messageState;
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(titleIsValid && messageIsValid);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [titleIsValid, messageIsValid]);

  const validateFormHandler = async (event) => {
    event.preventDefault();
    if (!messageIsValid) {
      messageRef.current.focus();
    }
    if (!titleIsValid) {
      titleRef.current.focus();
    }
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();

    const reviewData = {
      title: titleState.value,
      message: messageState.value,
      rating: ratingRef.current.value,
    };

    await addReview(props.productId, reviewData);
    props.onAddReview();
  };
  return (
    <form
      className={classes["form"]}
      onSubmit={formIsValid ? submitFormHandler : validateFormHandler}
      method="post"
    >
      <Input
        ref={titleRef}
        type="text"
        placeholder="Title"
        onChange={titleChangeHandler}
        onBlur={validateTitleHandler}
        name="authorName"
        value={titleState.value}
        isValid={titleIsValid}
      />
      <Input
        ref={messageRef}
        type="textarea"
        rows="5"
        maxLength={400}
        minLength={20}
        placeholder="Message"
        onChange={messageChangeHandler}
        onBlur={validateMessageHandler}
        name="description"
        value={messageState.value}
        isValid={messageIsValid}
      />
      <BasicRating ref={ratingRef} defaultValue={2.5} />
      <Button className="btn-large" marginTop="2rem">
        Submit
      </Button>
    </form>
  );
}

export default Form;
