import { useEffect, useState, useContext } from "react";
import { LoadingContext } from "../../context/LoadingContext.jsx";
import { getNearEarthObjects } from "../../api/earth.js";

function NearEarthObjects() {
  const [objects, setObjects] = useState([]);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchObjectNearEarth = async () => {
      try {
        startLoading();
        const data = await getNearEarthObjects();
        console.log(data);
        setObjects(data);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };

    fetchObjectNearEarth();
  }, []);
  return <></>;
}

export default NearEarthObjects;
