// FightResultsTable.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultsTable = () => {
  const [battleHistory, setBattleHistory] = useState([]);

  useEffect(() => {
    const fetchBattleHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/fight-logs"
        );
        setBattleHistory(response.data);
      } catch (error) {
        console.error("Error fetching fight logs:", error);
      }
    };

    fetchBattleHistory();
  }, []);

  return (
    <div className=" bg-yellow-200 h-screen">
        <div className=" flex justify-center">
            <h2 className="py-5 text-4xl font-bold">Fight Results Table</h2>
          </div>
        <div className="flex justify-center item-center">
        
          <table className="mb-10 shadow-2xl font-[Poppins] border-2 border-white w-2/3">
            <thead className="text-white">
              <tr>
                <th className="py-2 bg-orange-500 ">Pokemon 1</th>
                <th className="py-2 bg-orange-500">Pokemon 2</th>
                <th className="py-2 bg-orange-500">Winner</th>
                <th className="py-2 bg-orange-500">Battle Log</th>
              </tr>
            </thead>
            <tbody className="text-slate-500 text-center border-2 border-white">
              {battleHistory.map((fight, index) => (
                <tr
                  className="bg-orange-200 cursor-pointer duration-300"
                  key={index}
                >
                  <td className="py-3 px-6 border-2 border-white">
                    {fight.pokemon1}
                  </td>
                  <td className="py-3 px-6 border-2 border-white">
                    {fight.pokemon2}
                  </td>
                  <td className="py-3 px-6 border-2 border-white">
                    {fight.winner}
                  </td>
                  <td className="py-3 px-6 border-2 border-white">
                    <ul>
                      {fight.battleLog.map((log, idx) => (
                        <li key={idx}>{log}</li>
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
