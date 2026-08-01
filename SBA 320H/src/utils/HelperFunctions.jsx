import {
  LuFlame,
  LuWind,
  LuMountain,
  LuTriangleAlert,
  LuSun,
  LuCloudSun,
  LuCloudRain,
  LuSnowflake,
  LuCloudLightning,
  LuGlobe,
} from "react-icons/lu";

// This file for every helper functions in whole project

// Get category badge
export const getCategoryBadge = (categoryName = "") => {
  const name = categoryName.toLowerCase();
  if (name.includes("wildfire") || name.includes("fire")) {
    return { icon: <LuFlame />, color: "#f97316", label: "Wildfires" };
  }
  if (name.includes("storm") || name.includes("cyclone")) {
    return { icon: <LuWind />, color: "#3b82f6", label: "Storms" };
  }
  if (name.includes("volcano")) {
    return { icon: <LuMountain />, color: "#ef4444", label: "Volcanoes" };
  }

  return {
    icon: <LuTriangleAlert />,
    color: "#a855f7",
    label: categoryName || "Event",
  };
};

// Get magnitude syle
export const getMagnitudeStyle = (mag) => {
  const magnitude = Number(mag) || 0;

  if (magnitude >= 7.0) {
    return {
      color: "#dc2626",
      bg: "rgba(220, 38, 38, 0.2)",
      border: "rgba(220, 38, 38, 0.5)",
      label: "Major",
    };
  }
  if (magnitude >= 6.5) {
    return {
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.15)",
      border: "rgba(239, 68, 68, 0.4)",
      label: "Strong",
    };
  }
  if (magnitude >= 6.0) {
    return {
      color: "#f97316",
      bg: "rgba(249, 115, 22, 0.15)",
      border: "rgba(249, 115, 22, 0.4)",
      label: "Moderate",
    };
  }
  return {
    color: "#eab308",
    bg: "rgba(234, 179, 8, 0.15)",
    border: "rgba(234, 179, 8, 0.4)",
    label: "Light",
  };
};

// Get last 30 days earthquakes
export const getLastThirtyDaysEarthquakes = () => {
  const end = new Date();

  const start = new Date();
  start.setDate(end.getDate() - 30);

  const formattedStart = start.toISOString().split("T")[0];
  const formattedEnd = end.toISOString().split("T")[0];
  return { formattedStart, formattedEnd };
};

// Weather icons
export const getWeatherIcon = (code) => {
  if (code === 0) return <LuSun style={{ color: "#f59e0b" }} />;
  if (code <= 3) return <LuCloudSun style={{ color: "#94a3b8" }} />;
  if (code <= 67) return <LuCloudRain style={{ color: "#38bdf8" }} />;
  if (code <= 77) return <LuSnowflake style={{ color: "#e2e8f0" }} />;
  if (code <= 99) return <LuCloudLightning style={{ color: "#eab308" }} />;

  return <LuGlobe />;
};
