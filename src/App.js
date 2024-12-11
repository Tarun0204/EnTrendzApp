import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(item => {
        if (item.id === productId) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      return {cartList: updatedCartList}
    })
  }

  decrementCartItemQuantity = productId => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList
        .map(item => {
          if (item.id === productId && item.quantity > 1) {
            return {...item, quantity: item.quantity - 1}
          }
          if (item.id === productId && item.quantity === 1) {
            return null
          }
          return item
        })
        .filter(item => item !== null)
      return {cartList: updatedCartList}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const index = cartList.findIndex(
      eachProduct => eachProduct.id === product.id,
    )
    if (index === -1) {
      this.setState({cartList: [...cartList, {...product, quantity: 1}]})
    } else {
      const updatedCartList = [...cartList]
      updatedCartList[index].quantity += 1
      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(product => product.id !== productId)
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
