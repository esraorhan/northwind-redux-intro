import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { ListGroup, ListGroupItem } from "reactstrap";

class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }

  render() {
    return (
      <div>
        <h5>
          <h3> Categories</h3>
          <ListGroup>
            {this.props.categories.map((category) => (
              <ListGroupItem key={category.id}>
                {category.categoryName}
              </ListGroupItem>
            ))}
          </ListGroup>
          seçili kategory: {this.props.currentCategory.categoryName}
        </h5>
      </div>
    );
  }
}
//middleware yönetimi:reducer da congigure storda
//seçili kategoriyi buraya göndeermek
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    categories: state.categoryListReducer,
  };
}

//bir asiyona bağlanmak için,aksiyonu proplara bağla
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCategories: bindActionCreators(
        categoryActions.getCategories,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
