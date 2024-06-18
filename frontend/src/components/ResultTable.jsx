// FightResultsTable.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultsTable = () => {
  const [battleHistory, setBattleHistory] = useState([]);

  const BASE_URL = 'https://pokefight-u2oc.onrender.com'

  useEffect(() => {
    const fetchBattleHistory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/fight-logs`
        );
        setBattleHistory(response.data);
      } catch (error) {
        console.error("Error fetching fight logs:", error);
      }
    };

    fetchBattleHistory();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};  

  return (
    <div className=" bg-yellow-200">
        <div className=" flex justify-center">
            <h2 className="py-5 text-4xl font-bold">Fight Results Table</h2>
          </div>
        <div className="flex justify-center item-center">
        
          <table className="mb-10 shadow-2xl font-[Poppins] border-2 border-white w-1/2">
            <thead className="text-white" >
              <tr className="bg-orange-500 text-xl">
                <th>Pokemon 1</th>
                <th>Pokemon 2</th>
                <th>Winner</th>
                <th>Battle Log</th>
              </tr>
            </thead>
            <tbody className="text-slate-500 text-center  border-2 border-white">
              {battleHistory.map((fight, index) => (
                <tr
                  className="bg-orange-200 cursor-pointer duration-300"
                  key={index}
                >
                  <td className="py-3 px-6 border-2 border-white">
                    {capitalizeFirstLetter(fight.pokemon1)}
                  </td>
                  <td className="py-3 px-6 border-2 border-white">
                    {capitalizeFirstLetter(fight.pokemon2)}
                  </td>
                  <td className="py-3 px-6 border-2 border-white  text-blue-500">
                    {capitalizeFirstLetter(fight.winner)}
                  </td>
                  <td className="py-3 px-6 border-2 text-justify border-white">
                    <ul>
                      {fight.battleLog.map((log, idx) => (
                        <li key={idx}>{capitalizeFirstLetter(log)}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default ResultsTable;
