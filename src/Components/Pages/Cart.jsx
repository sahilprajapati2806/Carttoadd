import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove, incrementQty, decrementQty } from "../Slice/Cartslice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const [showPopup, setShowPopup] = useState(false);

  const [delivery, setDelivery] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 0;
  const totalAmount = subTotal + deliveryCharge;

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    if (
      !delivery.name ||
      !delivery.mobile ||
      !delivery.email ||
      !delivery.address ||
      !delivery.city ||
      !delivery.pincode
    ) {
      alert("Please fill all delivery details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      userId: user._id,
      customer: delivery,
      items: cartItems,
      totalAmount: totalAmount,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/order/place",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully 🎉");
        setShowPopup(false);
      } else {
        alert(data.message || "Order failed");
      }
    } catch (error) {
      console.log("Order error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart Items</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
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
            cartItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-img"
                  />
                </td>

                <td>{item.title}</td>
                <td>${item.price}</td>

                {/* ✅ UPDATED QTY SECTION */}
                <td>
                  <div className="qtybox">
                    <button
                      className="qtybtn"
                      onClick={() => dispatch(decrementQty(item._id))}
                    >
                      -
                    </button>

                    <span className="qtyvalue">
                      {item.quantity}
                    </span>

                    <button
                      className="qtybtn"
                      onClick={() => dispatch(incrementQty(item._id))}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                {/* ✅ UPDATED REMOVE BUTTON */}
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(remove(item._id))}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {cartItems.length > 0 && (
        <div className="order-section">
          <h3>Total: ${totalAmount.toFixed(2)}</h3>
          <button
            className="placeorder-btn"
            onClick={() => setShowPopup(true)}
          >
            Place Order
          </button>
        </div>
      )}

      {/* ================= POPUP ================= */}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Delivery Details</h3>

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={delivery.name}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              name="mobile"
              value={delivery.mobile}
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={delivery.email}
              onChange={handleChange}
            />

            <textarea
              placeholder="Full Address"
              name="address"
              value={delivery.address}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="City"
              name="city"
              value={delivery.city}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              value={delivery.pincode}
              onChange={handleChange}
            />

            <div className="popup-btns">
              <button onClick={handleOrder}>
                Confirm Order
              </button>

              <button onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
