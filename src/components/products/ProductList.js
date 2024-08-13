import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Table, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Link } from "react-router-dom";
class ProductList extends Component {

  componentDidMount() {
    this.props.actions.getProducts();
  }
addToCart=(product)=>{
  this.props.actions.addToCart({quantity:1,product});

  alertify.success(product.productName + " sepete eklendi.", 2);
}
  render() {
    return (
      <div>
        <Badge color="warning">Products</Badge>
        <Badge color="success">{this.props.currentCategory.categoryName}</Badge>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün adı</th>
              <th>Birim fiyat</th>
              <th>Miktar</th>
              <th>Stok</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((p) => (
              <tr key={p.id}>
                <th scope="row">{p.id}</th>
                <td> <Link to={"/saveproduct/"+p.id}> {p.productName}</Link> </td>
                <td>{p.unitPrice}</td>
                <td>{p.quantityPerUnit}</td>
                <td>{p.unitsInStock}</td>
                <td>
                  <Button onClick={()=>this.addToCart(p)} color="info">Sepete Ekle</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer,
  };
}

//bir asiyona bağlanmak için,aksiyonu proplara bağla
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
