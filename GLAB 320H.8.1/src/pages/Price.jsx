import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Price(props) {
  const apiKey = `a74699d0-bf78-44f8-bfb4-1280d73881d9`;

  const params = useParams();
  const symbol = params.symbol;

  const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/?apikey=${apiKey}`;

  const [coin, setCoin] = useState("null");

  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCoin();
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>{coin.rate}</h2>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return coin && coin.rate ? loaded() : loading();
}
