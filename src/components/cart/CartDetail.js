import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Badge, Table, Button } from "reactstrap";
import alertify from "alertifyjs";
class CartDetail extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);

    alertify.warning(product.productName + " silindi.", 2);
  }
  render() {
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Ürün adı</th>
              <th>Birim fiyat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((c) => (
              <tr key={c.product.id}>
                <th scope="row">{c.product.id}</th>
                <td>{c.product.productName}</td>
                <td>{c.product.unitPrice}</td>

                <td>
                  <Button
                    onClick={() => this.removeFromCart(c.product)}
                    color="danger"
                  >
                    Sil
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
