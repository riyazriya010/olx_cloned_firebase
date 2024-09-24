/* eslint-disable no-unused-vars */
import React from "react";
import { useContext } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

function Header() {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="India"/>
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        {user ? (
          <>
            <button
              onClick={handleLogOut}
              className="logoutButton"
              >
              Logout
            </button>
              <p>{user.displayName}</p>
          </>
        ) : (
          <div className="loginPage">
            <Link
              to="/login"
              className="loginLink"
            >
              Login
            </Link>
          </div>
        )}
        {user ? (
          <div className="sellMenu" onClick={() => navigate("/addProduct")}>
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
