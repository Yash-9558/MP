import React, { useEffect, useState } from "react";
import Main from "../Main";
import {
  fetchProductByName,
  getProductsOfCategory,
  sortItems,
} from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import ProductContent from "../Product/ProductContent";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { STATUS } from "../../utils/variables";

function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const categoryId = pathName.split("/")[2];

  const [items, setItems] = useState([]);
  const [filterdItems, setFilterdItems] = useState([]);

  const fetchItemsHandler = async (id) => {
    const data = await getProductsOfCategory(id);
    return data;
  };
  const navigateHandler = (id) => {
    navigate("/product/" + id);
  };
  const updateStateHandler = (data) => {
    setItems(data);
    setFilterdItems(data);
  };
  useEffect(() => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    fetchItemsHandler(categoryId).then((data) => {
      updateStateHandler(data);
      dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
    });
  }, []);

  const searchChangeHandler = (eve) => {
    const searchTxt = eve.target.value;
    const filterdItems = fetchProductByName(searchTxt, items);
    setFilterdItems(filterdItems);
  };
  const sortItemsHandler = async (sortBy) => {
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.LOAD }));
    const sortedItems = await sortItems(categoryId, sortBy);
    updateStateHandler(sortedItems);
    dispatch(uiActions.setIsLoadingBar({ status: STATUS.COMPLETE }));
  };

  return (
    <div>
      <Main
        name="Action Books"
        searchHolder="Search book or author"
        applyFilter={true}
        onSearch={searchChangeHandler}
        onSort={sortItemsHandler}
        gridContent={
          <ProductContent items={filterdItems} onClick={navigateHandler} />
        }
      />
    </div>
  );
}

export default Product;
