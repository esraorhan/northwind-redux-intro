import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryList extends Component {
  render() {
    return (
      <div>
        <h5>
        seçili kategory: {this.props.currentCategory.categoryName}
      </h5>
      </div>
      
    )
  }
}

//seçili kategoriyi buraya göndeermek 
function mapStateToProps(state){
  return {
    currentCategory:state.changeCategoryReducer
  }
}

export default connect(mapStateToProps)(CategoryList)