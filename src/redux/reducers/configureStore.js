import { applyMiddleware, createStore } from "redux";
import rootReducer from "./index";
import { thunk } from "redux-thunk";

//state veri tabanı gibi düşünebiliriz.

export default function configureStore(){
    return createStore(rootReducer,applyMiddleware(thunk));
}