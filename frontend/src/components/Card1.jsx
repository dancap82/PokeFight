import React from "react";
import pokemon from "/src/assets/pokemon.png";

const Card1 = () => {
  return (
    <div className="min-h-screen container mx-auto bg-yellow-300">
      <div className="grid grid-cols-1 md:gird-cols-1 lg:grid-cols-3 gap-6 m-6 pt-6">
        <div className="rounded-xl shadow-lg  bg-white ">
          <div className="p-4 flex flex-col">
            <h5 className="font-bold text-3xl mt-2 mb-2 font-serif">Balasure</h5>
            <div className="rounded-xl overflow-hidden">
              <img src={pokemon} alt="" />
            </div>
            <div>
              <div className="flex flex-2  gap-20 justify-center mt-4 mb-2 ml-2">
                <div className="border-4 border-red-600 rounded-full h-10 w-10 flex items-center justify-center">
                  <h6>45</h6>
                </div>
                <div className="border-4 border-green-500 rounded-full h-10 w-10 flex items-center justify-center">
                  <h6>45</h6>
                </div>
              </div>
              <div className="flex flex-2 justify-center gap-16 mb-6 ml-2 font-serif">
                <div className="">
                  <h6 className="font-bold text-xl2 ">Attack</h6>
                </div>
                <div className=" flex items-center justify-center">
                  <h6 className="font-bold text-xl2">Defense</h6>
                </div>
              </div>
              <div className="flex flex-2 justify-center gap-8">
                <div className="">
                  <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
                    Grass
                  </button>
                </div>
                <div className=" flex items-center justify-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full">
                    Poison
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card1;
