import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../Slice/WishlistSlice";
import { add } from "../Slice/Cartslice";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="cart-container">
      <h2>Wishlist Items </h2>

      {wishlistItems.length === 0 ? (
        <h3>Your wishlist is empty</h3>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Price</th>
              <th>Add To Cart</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {wishlistItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} width="80" />
                </td>

                <td>{item.title}</td>

                <td>${item.price}</td>

                <td>
                  <button onClick={() => dispatch(add(item))}>
                    Add to Cart
                  </button>
                </td>

                <td>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Wishlist;
