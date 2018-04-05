import {connect} from 'react-redux'
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'


class ProductDetails extends PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })).isRequired
  }


  render() {
    const {product} = this.props
    const productImage = this.props.image;
    return (
      <div>
        <h1>{ product.name }</h1>
        <p> &euro; { product.price }.00</p>
        <img src={productImage ? product.image : null} alt=""/>
        <p> { product.description } </p>
        <button className="BuyProduct" onClick={this.props.onClick}>Buy this product</button>
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    product: state.products.find(p => p.id === Number(props.match.params.id))
  }
}

export default connect(mapStateToProps)(ProductDetails)
