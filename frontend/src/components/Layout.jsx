import { NavLink, Outlet } from "react-router-dom";
import { useState, useRef } from "react";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { IonIcon } from "react-ionicons";
import logo from "../assets/imgs/pokemon-23.svg";
import facebook from "../assets/icons/facebook-50.png";
import instagram from "../assets/icons/instagram-50.png";
import tiktok from "../assets/icons/tiktok-50.png";
import youtube from "../assets/icons/youtube-50.png";
import "../App.css";

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const listRef = useRef(null);

  const handleMenuToggle = () => {
    const list = listRef.current;
    if (!list) return;

    if (isMenuOpen) {
      list.classList.remove("top-[60px]");
      list.classList.remove("opacity-100");
      list.classList.add("absolute");
      list.classList.remove("pointer-events-auto");
    } else {
      list.classList.add("top-[60px]");
      list.classList.add("opacity-100");
      list.classList.remove("absolute");
      list.classList.add("pointer-events-auto");
    }

    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className=" nav md:flex md:items-center md:justify-between py-4 md:py-6 lg:py-6 px-6 md:px-8 lg:px-12 items-center relative">
        <div className="flex justify-between items-center">
          <span>
            <img className="w-32" src={logo} alt="pokemon-logo" />
          </span>
          <span className="text-3xl cursor-pointer mx-2 md:hidden block">
            <button onClick={handleMenuToggle}>
              {isMenuOpen ? (
                <IoCloseOutline size={24} />
              ) : (
                <IoMenuOutline size={24} />
              )}
            </button>
          </span>
        </div>
        <ul
          ref={listRef}
          className="nav md:flex md:items-center w-full md:w-auto md:py-0 md:pl-0 pl-2 md:opacity-100 opacity-0 top-[-200px] transition-all ease-in duration-500 left-0 z-[-1] md:z-auto md:static align-middle absolute gap-4 md:gap-4 lg:gap-10 xl:gap-12 2xl:gap-20 lg:pr-8 xl:pr-12 2xl:pr-20"
        >
          <li className="font my-4 md:my-0 mx-4">
            <NavLink className="navlinks" to="/">
              {" "}
              Home{" "}
            </NavLink>
          </li>
          <li className="font my-4 md:my-0 mx-4">
            <NavLink className="navlinks" to="/pokedex">
              {" "}
              Pokédex{" "}
            </NavLink>
          </li>
          <li className="font my-4 md:my-0 mx-4">
            <NavLink className="navlinks" to="/fight">
              {" "}
              Fight{" "}
            </NavLink>
          </li>
          <li className="font my-4 md:my-0 mx-4">
            <NavLink className="navlinks" to="/FightResults">
              {" "}
              Fight Results{" "}
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="bg-black flex flex-col md:flex-row p-4 text-center md:text-left justify-around">
        <img className="w-80 mx-auto md:mx-0" src={logo} alt="logo-pokemon" />
        <div className="flex flex-col justify-center mt-4 md:mt-0 md:items-start">
          <br />
          <h4 className="text-white font-bold">Company</h4>
          <br />
          <p className="text-white">Kopernikusstraße 16</p>
          <p className="text-white">15430, Berlin</p>
          <p className="text-white">Germany</p>
        </div>
        <div className="flex flex-col pt-12 md:pt-0 justify-center">
          <h4 className="text-white font-bold">Contact Us</h4>
          <br />
          <div className="flex justify-center md:justify-start gap-2">
            <img src={facebook} alt="facebook-logo" />
            <img src={instagram} alt="instagram-logo" />
            <img src={tiktok} alt="tiktok-logo" />
            <img src={youtube} alt="youtube-logo" />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
