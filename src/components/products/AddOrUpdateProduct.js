import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useParams, useNavigate } from 'react-router-dom';

function AddOrUpdateProduct({
  products,
  categories,
  getCategories,
  saveProduct,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    if (productId && products.length > 0) {
      const foundProduct = getProductById(products, productId);
      if (foundProduct) setProduct(foundProduct);
    }
  }, [productId, products, categories, getCategories]);

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
      navigate("/");
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
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

function mapStateToProps(state) {
  return {
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
//useParams gibi React Hook'ları sadece React bileşenleri içinde kullanılmalıdır, bu nedenle mapStateToProps'ta kullanılamaz.