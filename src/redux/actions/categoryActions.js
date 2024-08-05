import * as actionTypes from "./actionTypes";

export function changeCategory(category) {
  return { type: actionTypes.CHANGE_CATEGORY, payload: category };
}
//aksiyon ile componentin iletişime geçmesi redux da redux = state demektir.

export function getCategoriesSuccess(categories) {
  return { type: actionTypes.GET_CATEGORİES_SUCCESS, payload: categories };
}

export function getCategories() {
  //apiye bağlanma gibi , veritababnın a bağlanma gibi durumlarda redux thunk gibi bir yaoı çıkıyor.
  return function (dispatch) {
    debugger;
    let url = "http://localhost:3000/categories";
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCategoriesSuccess(result)));
  };
}
