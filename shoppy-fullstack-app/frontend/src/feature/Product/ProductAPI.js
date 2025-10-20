import React from 'react';
import { createProduct, filterProduct } from './ProductSlice.js';
import { axiosData, groupByRows, axiosGet } from '../../utils/dataFetch.js';

export const getProduct = (pid) => async(dispatch) => {
    // dispatch(filterProduct(pid));
    dispatch(filterProduct({"pid": pid}));
}

export const getProductList = (number) => async(dispatch) => {
    // const jsonData = await axiosData("/data/products.json");
    const url = "/product/all";
    const jsonData = await axiosGet(url);

    const rows = groupByRows(jsonData, number);
    dispatch(createProduct({"productList": rows, "products":jsonData}));
}

