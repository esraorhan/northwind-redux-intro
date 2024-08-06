import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { ListGroup, ListGroupItem,Badge } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";
class CategoryList extends Component {
  componentDidMount() {
    this.props.actions.getCategories();
  }
  //event
  selectCategory = (category) => {
    this.props.actions.changeCategory(category);
    this.props.actions.getProducts(category.id);
  };

  render() {
    return (
      <div>
        <h5>
          <h3>   <Badge color="warning">Categories</Badge></h3>
          <ListGroup>
            {this.props.categories.map((category) => (
              <ListGroupItem
                active={category.id === this.props.currentCategory.id}
                onClick={() => this.selectCategory(category)}
                key={category.id}
              >
                {category.categoryName}
              </ListGroupItem>
            ))}
          </ListGroup>
        
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
      changeCategory: bindActionCreators(
        categoryActions.changeCategory,
        dispatch
      ),
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
