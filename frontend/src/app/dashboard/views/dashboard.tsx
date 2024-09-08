/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

import env from "../../../../enviroment.json";

import { useReadContract, useAccount } from "wagmi";

interface HistoryInterface {
  Valor: bigint; // Tipo BigInt
  Watts: bigint; // Tipo BigInt
}

export default function Dashboard() {
  const [wattsCount, setWattsCount] = useState(0);
  const [wattsRestantes, setWattsRestantes] = useState(0);
  const [tokens, setTokens] = useState("0");

  const currentUser = useAccount();

  const result = useReadContract({
    abi: env.homeNet.abi,
    address: env.homeNet.address as `0x${string}`,
    functionName: "getServicios",
    args: [currentUser.address],
  });

  useEffect(() => {
    if (result.data) {
      const data = result.data as HistoryInterface[];
      let totalWatts = 0;
      let totalRestantes = 0;
      let totalGas = 0;
      data.forEach(row => {
        totalWatts += +row.Watts.toString();
        totalGas += +row.Valor.toString();
      });

      totalRestantes = totalWatts - totalGas;
      totalGas = totalGas / 18;
      setWattsCount(totalWatts);
      setWattsRestantes(totalRestantes);
      setTokens((totalGas).toFixed(3));

    }
  }, [result]);

  return (
    <>
      <div className="analyse">
        <div className="sales">
          <div className="status">
            <div className="info">
              <h3>Watts Recargados</h3>
              <h1>
                &nbsp;
                {wattsCount} W
              </h1>
            </div>
            <div className="progresss">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="percentage">
                <p>+100%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="visits">
          <div className="status">
            <div className="info">
              <h3>Watts Restantes</h3>
              <h1>&nbsp; {wattsRestantes} W</h1>
            </div>
            <div className="progresss">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="percentage">
                <p>-48%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="searches">
          <div className="status">
            <div className="info">
              <h3>Total de Cargas</h3>
              <h1>
                &nbsp;
                {tokens} AVAX
              </h1>
            </div>
            <div className="progresss">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="percentage">
                <p>+21%</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="user-profile">
        <div className="logo">
          <img src="https://api.natupuntos.online/api/uploads/users/profile/logo.png" />
          <h2>AsmrProg</h2>
          <p>Fullstack Web Developer</p>
        </div>
      </div>
    </>

  );
}
