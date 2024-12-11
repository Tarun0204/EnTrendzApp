import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import './index.css'

const radioButtonsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const CartSummary = () => {
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const handleRadioChange = event => {
    if (event.target.value === 'CASH ON DELIVERY') {
      setIsConfirmEnabled(true)
    } else {
      setIsConfirmEnabled(false)
    }
  }

  const handleConfirmOrder = () => {
    setIsOrderPlaced(true)
  }

  const handleBack = (removeAllCartItems, close) => {
    removeAllCartItems()
    close()
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value

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
            <Popup
              className="checkout-popup"
              modal
              trigger={
                <button type="button" className="checkout-button">
                  Checkout
                </button>
              }
            >
              {close => (
                <div className="hero-popup">
                  {isOrderPlaced ? (
                    <div className="success-message">
                      <h1>Your order has been placed successfully</h1>
                      <button
                        type="button"
                        className="confirm-button"
                        onClick={() => handleBack(removeAllCartItems, close)}
                      >
                        Back
                      </button>
                    </div>
                  ) : (
                    <div className="modal-container">
                      <h1 className="payment-heading">Payment Details</h1>
                      <p className="payment-para">Payment Method</p>
                      <div
                        className="checkout-popup-input-fields"
                        onChange={handleRadioChange}
                      >
                        {radioButtonsList.map(
                          ({id, displayText, isDisabled}) => (
                            <div key={id} className="radio-item">
                              <input
                                type="radio"
                                id={id}
                                name="paymentMethod"
                                value={id}
                                disabled={isDisabled}
                              />
                              <label htmlFor={id}>{displayText}</label>
                            </div>
                          ),
                        )}
                      </div>
                      <div className="check-order-details">
                        <p>Quantity: {totalCartLength}</p>
                        <p>Total Price: RS {total}/-</p>
                      </div>
                      <button
                        type="button"
                        className="confirm-button"
                        onClick={close}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="confirm-button"
                        style={{
                          backgroundColor: isConfirmEnabled ? 'green' : '#ccc',
                          cursor: isConfirmEnabled ? 'pointer' : 'not-allowed',
                        }}
                        disabled={!isConfirmEnabled}
                        onClick={handleConfirmOrder}
                      >
                        Confirm Order
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
