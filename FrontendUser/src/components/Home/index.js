import React, { Fragment, useEffect, useState } from "react";
import classes from "./index.module.css";
import Header from "./Header";
import Main from "../Main";
import { fetchCategoryByName, getAllCategories } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CategoryContent from "../Home/CategoryContent";

function Home() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [filterdItems, setFilterdItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchItemsHandler = async () => {
    setIsLoading(true);
    const data = await getAllCategories();
    return data;
  };
  const navigateHandler = (id) => {
    navigate("/products/" + id);
  };
  useEffect(() => {
    fetchItemsHandler().then((data) => {
      setItems(data);
      setFilterdItems(data);
      setIsLoading(false);
    });
  }, []);

  const searchChangeHandler = (eve) => {
    const searchTxt = eve.target.value;
    const filterdItems = fetchCategoryByName(searchTxt, items);
    setFilterdItems(filterdItems);
  };

  return (
    <Fragment>
      <Header />
      <hr className={classes["divider"]}></hr>

      <Main
        name="inventory"
        searchHolder="Search genre"
        isLoading={isLoading}
        onSearch={searchChangeHandler}
        gridContent={
          <CategoryContent items={filterdItems} onClick={navigateHandler} />
        }
      />
    </Fragment>
  );
}

export default Home;
