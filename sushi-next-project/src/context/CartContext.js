import React, { createContext, useState } from 'react'

const CartContext = createContext({})

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const [isCartOpen, setIsCartOpen] = useState(false)
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const increaseCartQuantity = (sushi, quantity = 1) => {
    let newCartItems = []

    const index = cartItems.findIndex((item) => item?.sushi?.id === sushi.id)
    if (index === -1) {
      newCartItems = [...cartItems, { sushi, quantity }]
    } else {
      newCartItems = [
        ...cartItems.slice(0, index),
        {
          ...cartItems[index],
          quantity: cartItems[index].quantity + quantity,
        },
        ...cartItems.slice(index + 1),
      ]
    }

    setCartItems(newCartItems)
  }

  const decreaseCartQuantity = (sushi, quantity = 1) => {
    let newCartItems = []

    const index = cartItems.findIndex((item) => item?.sushi?.id === sushi.id)
    if (index === -1) {
      return
    } else {
      const newQuantity = cartItems[index].quantity - quantity
      if (newQuantity <= 0) {
        return removeFromCart(sushi)
      }

      newCartItems = [
        ...cartItems.slice(0, index),
        {
          ...cartItems[index],
          quantity: newQuantity,
        },
        ...cartItems.slice(index + 1),
      ]
    }

    setCartItems(newCartItems)
  }

  const removeFromCart = (sushi) => {
    const index = cartItems.findIndex((item) => item?.sushi?.id === sushi.id)
    setCartItems([...cartItems.slice(0, index), ...cartItems.slice(index + 1)])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        isOpenCart: isCartOpen,
        openCart,
        closeCart,
        increaseCartQuantity,
        removeFromCart,
        decreaseCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export default CartContext
