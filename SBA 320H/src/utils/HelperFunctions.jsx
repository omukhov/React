import { LuFlame, LuWind, LuMountain, LuTriangleAlert } from "react-icons/lu";

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

export const getLastThirtyDaysEarthquakes = () => {
  const end = new Date();

  const start = new Date();
  start.setDate(end.getDate() - 30);

  const formattedStart = start.toISOString().split("T")[0];
  const formattedEnd = end.toISOString().split("T")[0];
  return { formattedStart, formattedEnd };
};

export const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 67) return "🌧";
  if (code <= 77) return "❄️";
  if (code <= 99) return "⛈";

  return "🌍";
};
