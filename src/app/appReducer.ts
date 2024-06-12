﻿import { combineReducers } from "@reduxjs/toolkit";
import { newsApi } from "@/entities/news/api/newsApi"
import newsReducer from "@/entities/news/model/newsSlices"
import { categoriesApi } from "@/entities/category/api/categoriesApi";

export const rootReducer = combineReducers({
    news: newsReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
})