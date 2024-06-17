import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/imgs/pokemon-23.svg";
import facebook from "../assets/icons/facebook-50.png";
import instagram from "../assets/icons/instagram-50.png";
import tiktok from "../assets/icons/tiktok-50.png";
import youtube from "../assets/icons/youtube-50.png";
import "../App.css";

function Layout() {
  return (
    <>
      <nav className="flex nav justify-between py-4 px-6 md:px-12 lg:px-20 xl:px-24 2xl:px-32 items-center">
        <img className="w-32" src={logo} alt="pokemon-logo" />
        <div className="flex align-middle gap-4 md:gap-6 lg:gap-10 xl:gap-20 2xl:gap-32">
          <NavLink className="navlinks" to="/">
            {" "}
            Home{" "}
          </NavLink>
          <NavLink className="navlinks" to="/pokedex">
            {" "}
            Pokédex{" "}
          </NavLink>
          <NavLink className="navlinks" to="/fight">
            {" "}
            Fight{" "}
          </NavLink>
          <NavLink className="navlinks" to="/FightResults">
            {" "}
            Fight Results{" "}
          </NavLink>
        </div>
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
