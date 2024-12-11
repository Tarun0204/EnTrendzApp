// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(item => {
        total += item.price * item.quantity
      })

      const totalCartLength = cartList.length

      return (
        <div className="cart-summary-container">
          <h1 className="cart-summary-heading">
            <span className="order">Order Total:</span> {total} /-
          </h1>
          <p className="cart-summary-para">{totalCartLength} Items in cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
