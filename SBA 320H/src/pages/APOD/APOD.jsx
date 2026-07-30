import { useEffect, useState, useContext } from "react";
import { getAPOD } from "../../api/nasa.js";
import Loader from "../../components/Loader/Loader.jsx";
import { LoadingContext } from "../../context/LoadingContext.jsx";

function APOD() {
  const [apod, setApod] = useState(null);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        startLoading();
        const data = await getAPOD();
        setApod(data);
      } catch (err) {
        console.log(err);
      } finally {
        stopLoading();
      }
    };

    fetchAPOD();
  }, []);

  return (
    <>
      <div>
        <h1>{apod?.title}</h1>

        <img src={apod?.url} alt={apod?.title} />
      </div>
    </>
  );
}

export default APOD;
