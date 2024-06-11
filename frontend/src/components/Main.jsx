import "../App.css";
import logowhite from "../assets/imgs/pokemon-logo-white.svg";
import logo from "../assets/imgs/pokemon-23.svg";
import facebook from "../assets/icons/facebook-50.png";
import instagram from "../assets/icons/instagram-50.png";
import tiktok from "../assets/icons/tiktok-50.png";
import youtube from "../assets/icons/youtube-50.png";

function Main() {
  return (
    <>
      <section className="background-image h-screen w-screen">
        <div className="pt-8 md:pt-40 lg:pt-40 xl:pt-40 2xl:pt-40 px-8 md:px-12 lg:px-24 lg:w-2/3">
          <h1 className="text-6xl font-medium">
            Find all your favorite Pokemon
          </h1>
          <br />
          <p className="text-3xl font-medium pt-4">
            You can know the type of Pokemon, its strengths, disadvantages and
            abilities
          </p>
        </div>
      </section>

      {/* HERE SHOULD GO POKEDEX COMPONENT */}

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

export default Main;
