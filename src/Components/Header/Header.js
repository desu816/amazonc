import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl"; 
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader"; 
import { BiCart } from "react-icons/bi"; 
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase"

const Header = () => {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)
    

  const basketLength = Array.isArray(basket) ? totalItem : 0;

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon Logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin size={20} />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>

          <div className={classes.order_container}>
            <div className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
                alt="Flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </div>
            <Link to={!user && "/auth"}>
            <div>
                {user ? (
                  <>
                    <p>Hello {user.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>SignOut</span>
                  </>
                  
                ) : (
                    <>
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                    </>

                  
                )}
              </div>
              
            </Link>
            <Link to="/returns">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{basketLength}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
};

export default Header;
