import { useEffect, useState } from "react";
import { getAPOD } from "../api/nasa.js";
import Loader from "../components/Loader/Loader.jsx";

function APOD() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const data = await getAPOD();
        setApod(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);
  return (
    <>
      {apod ? (
        <div>
          <h1>{apod.title}</h1>

          <img src={apod.url} alt={apod.title} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default APOD;
