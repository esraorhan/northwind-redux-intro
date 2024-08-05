import { createStore } from "redux";
import rootReducer from "./index";

//state veri tabanı gibi düşünebiliriz.

export default function configureStore(){
    return createStore(rootReducer);
}