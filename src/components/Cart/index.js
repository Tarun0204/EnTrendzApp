import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const {removeAllCartItems, decrementCartItemQuantity} = value
      const showEmptyView = cartList.length === 0

      const onRemoveAllCartItems = () => {
        removeAllCartItems()
      }

      const onDecrementQuantity = productId => {
        decrementCartItemQuantity(productId)
      }

      // TODO: Update the functionality to remove all the items in the cart

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-button"
                  type="button"
                  onClick={onRemoveAllCartItems}
                  data-testid="remove"
                >
                  Remove All
                </button>
                <CartListView onDecrementQuantity={onDecrementQuantity} />
                <CartSummary />
                {/* TODO: Add your code for Cart Summary here */}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
