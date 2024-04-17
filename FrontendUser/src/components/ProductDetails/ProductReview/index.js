import React, { Fragment, useEffect, useState } from "react";
import classes from "./index.module.css";
import BasicRating from "../../Rating/";
import Form from "./Form";
import Button from "../../Button";
import {
  fetchUserProfile,
  getProductReviews,
  getReview,
} from "../../../utils/api";
import moment from "moment";
import LoadingSpinner from "../../UI/LoadingSpinner";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { SNACKBAR_DETAILS } from "../../../utils/variables";
import { useNavigate } from "react-router-dom";
import Heading from "../../Heading";

function ProductReview(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfileHandler = async () => {
    const data = await fetchUserProfile();
    return data;
  };

  const fetchReviewsHandler = async () => {
    const data = await getProductReviews(props.productId);
    return data;
  };

  const fetchReviewHandler = async () => {
    const data = await getReview(props.productId);
    return data;
  };

  const openFormHandler = async () => {
    if (userProfile) {
      setIsFormVisible(!isFormVisible);
    } else {
      dispatch(uiActions.setSnackBar({ ...SNACKBAR_DETAILS.ON_UNAUTHORIZED }));
      navigate("/auth", { replace: true });
    }
  };

  const closeFormHandler = () => {
    setIsFormVisible(false);
  };

  const updateReviewsHandler = () => {
    closeFormHandler();
    setIsReviewed(true);
    props.onReviewed();
  };

  useEffect(() => {
    if (userProfile) {
      setIsLoading(true);
      fetchReviewHandler().then((data) => {
        if (data) {
          setMyReview(data);
          setIsReviewed(true);
          return;
        }
        setIsLoading(false);
      });
    }
  }, [isReviewed, userProfile]);

  useEffect(() => {
    if (!userProfile) {
      fetchUserProfileHandler().then((data) => {
        setUserProfile(data);
      });
    }
    setIsLoading(true);
    fetchReviewsHandler().then((ProductReviews) => {
      if (myReview) {
        const filteredReviews = ProductReviews.filter(
          (review) => review._id !== myReview._id
        );
        setReviews([{ ...myReview, name: "You" }, ...filteredReviews]);
      } else {
        setReviews(ProductReviews);
      }
      setIsLoading(false);
    });
  }, [myReview]);

  return (
    <Fragment>
      <div className={classes["review-container"]}>
        <Heading title="Reviews" />
        <div className={classes["item-reviews"]}>
          {isLoading && <LoadingSpinner />}
          {!isLoading && reviews.length == 0 && (
            <p className={classes["empty-text"]}>No Reviews Yet</p>
          )}
          {!isLoading &&
            reviews.map((review) => {
              return (
                <div className={classes["item-container"]} key={review._id}>
                  <BasicRating
                    readOnly={true}
                    size="small"
                    value={review.rating}
                  />
                  <h1 className={classes["review-title"]}>{review.title}</h1>
                  <h3 className={classes["review-message"]}>
                    {review.message}
                  </h3>
                  <h1 className={classes["review-from"]}>
                    {`${review.name} on ${moment(review.createdAt).format(
                      "MMM DD, YYYY"
                    )}`}
                  </h1>
                </div>
              );
            })}
        </div>
      </div>
      <div className={classes["form-ctrl"]}>
        {isReviewed && (
          <div className={classes["success-text"]}>
            <h1>Thanks for your precious review</h1>
          </div>
        )}
        {!isFormVisible && !isReviewed && (
          <Button className="btn-large" onClick={openFormHandler}>
            Write A Review
          </Button>
        )}
        {isFormVisible && !isReviewed && (
          <div className={classes["form-container"]}>
            <KeyboardBackspaceIcon
              sx={{
                fontSize: "4rem",
                position: "absolute",
                top: "5.5rem",
                color: "var(--tertiary-font-color)",
                cursor: "pointer",
                "&:hover": {
                  color: "var(--primary-font-color)",
                },
              }}
              onClick={closeFormHandler}
            />
            <h1 className={classes["container-heading"]}>Give Review</h1>
            <Form
              productId={props.productId}
              onAddReview={updateReviewsHandler}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default ProductReview;
