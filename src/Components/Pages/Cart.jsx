import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, incrementQty, decrementQty } from "../Slice/Cartslice";

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  return (
    <div className="cart-container">
      <h2>Cart Items</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Products</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="6">Cart is empty</td>
            </tr>
          ) : (
            cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} className="cart-img" />
                </td>

                <td className="product-name">{item.title}</td>

                <td className="product-price">${item.price}</td>

                <td>
                  <div className="qtybox">
                    <button className="qtybtn" onClick={() => dispatch(decrementQty(item.id))}>-</button>
                    <span className="qtyvalue">{item.quantity}</span>
                    <button className="qtybtn" onClick={() => dispatch(incrementQty(item.id))}>+</button>
                  </div>
                </td>

                <td className="product-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                <td>
                  <button className="remove-btn" onClick={() => dispatch(remove(item.id))}>
                    X
                  </button>
                </td>
              </tr>

            ))
          )}
        </tbody>
      </table>
      <div className="cart-summary">
        <h3>
          Subtotal: <span>${subtotal.toFixed(2)}</span>
        </h3>
      </div>

    </div>
  );
};

export default Cart;
