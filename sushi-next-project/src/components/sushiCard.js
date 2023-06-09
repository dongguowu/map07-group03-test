import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Badge } from 'react-bootstrap'
import { formatCurrency } from '../utilities/formatCurrency'

import CartContext from '@/context/CartContext'

function SushiCard(props) {
  const { item } = props
  const [text, setText] = useState(item.description.slice(0, 120))
  const [show, setShow] = useState(
    text.length < item.description.length ? 'show more' : ''
  )

  const showMore = () => {
    setText(item.description)
    setShow('')
  }

  const {
    getItemQuantity,
    increaseCartQuantity,
    removeFromCart,
    decreaseCartQuantity,
  } = useContext(CartContext)

  const imageUrl = item.image
  const quantity = getItemQuantity(item)
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imageUrl} width="300px" height="280" />
      <Card.Body>
        <div>
          <Card.Title>{item.title || ''}</Card.Title>
          <Card.Text>
            {text}{' '}
            <a href="#" onClick={showMore}>
              {show}
            </a>
          </Card.Text>
        </div>
        <h3>
          <Badge bg="secondary"> {formatCurrency(item.price)}</Badge>
        </h3>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100 text-bg-sushi-orange"
              onClick={() => increaseCartQuantity(item)}
            >
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '.5rem' }}
              >
                <Button
                  className="text-bg-sushi-orange"
                  onClick={() => decreaseCartQuantity(item)}
                >
                  -
                </Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button
                  className="text-bg-sushi-orange"
                  onClick={() => increaseCartQuantity(item)}
                >
                  +
                </Button>
              </div>
              <Button
                onClick={() => removeFromCart(item)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

SushiCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
}

export default SushiCard
