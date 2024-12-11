import React, { useContext } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider'; 
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom';
import classes from './Cart.module.css';
import { Type } from '../../Utility/actiontype';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return ( 
    <LayOut>
      <section className={classes.container}> 
        <div className={classes.cart_container}>
          <h1>Hello, {user?.name || 'Guest'}</h1>
          <h2>Your Shopping Basket</h2>
          <hr />
          {basket?.length ? (
            basket.map((item) => (
              <section className={classes.cart_product} key={item.id}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  flex={true}
                />
                <div className={classes.btn_container}>
                  <button className={classes.btn} onClick={() => increment(item)} aria-label="Increase quantity">
                  <IoIosArrowUp size={40} />
                  </button>
                  <span> {item.amount} </span>
                  <button className={classes.btn} onClick={() => decrement(item.id)} aria-label="Decrease quantity">
                  <IoIosArrowDown size={40} />
                  </button>
                </div>
              </section>
            ))
          ) : (
            <p>Oops! No items in your cart. <Link to="/products">Start shopping now!</Link></p>
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to Checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
