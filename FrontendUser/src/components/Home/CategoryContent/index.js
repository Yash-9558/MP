import React, { Fragment } from "react";
import classes from "./index.module.css";
function CategoryContent(props) {
  return (
    <Fragment>
      {props.items?.length > 0 ? (
        props.items.map((item) => (
          <div
            className={classes["item-container"]}
            key={item._id}
            onClick={props.onClick.bind(null, item._id)}
          >
            <img className={classes["item-img"]} src={item?.image} alt="img" />
            <h1 className={classes["item-name"]}>{item.name}</h1>
          </div>
        ))
      ) : (
        <p className={"not-found-text"}>No Items Found!!</p>
      )}
    </Fragment>
  );
}
export default CategoryContent;
