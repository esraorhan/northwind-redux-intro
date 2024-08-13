import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
//useState: setState yerine useState kullanacağız.
//useEffect: componentDidMount yerine useEffect kullanacağız.
//... mevcut prop genişletme anlamına geliyor
function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });

  //product statetini veya statedeki product setProduct fonksiyonu ile set edebilirim demektir.

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}
export function getProductById(products, productId) {
  let product = products.find((product) => product.id === productId) || null;
  return product;
}
function mapStateToProps(state, ownProps) {
    const { match } = ownProps;
    const productId
   = match && match.params.productId;
  
    const product =
      productId && state.productListReducer.length > 0
        ? getProductById(state.productListReducer, productId)
        : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
