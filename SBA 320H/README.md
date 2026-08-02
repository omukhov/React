# Space Explorer

## Description

Space Explorer is a React application that combines several public space and Earth APIs into one interface. The application provides real-time data, interactive maps, weather information, Earth events, Mars rover photos, the International Space Station location, and Near-Earth Objects.

---

# Technologies

- React
- Vite
- React Router
- React Context API
- React Leaflet
- Three.js
- React Three Fiber
- React Globe GL
- Swiper
- CSS Modules

---

# Features

- Global loading system
- Interactive maps
- Live ISS tracking
- Earth events visualization
- Earthquake monitoring
- Weather map
- Mars rover gallery
- NASA Astronomy Picture of the Day
- Near-Earth Object explorer
- Responsive interface

---

# APIs Used

| API                     | Purpose                      |
| ----------------------- | ---------------------------- |
| NASA APOD               | Astronomy Picture of the Day |
| NASA EONET              | Natural Earth events         |
| NASA NeoWs              | Near-Earth Objects           |
| USGS Earthquake API     | Earthquakes                  |
| WhereTheISS             | ISS live location            |
| Open Meteo              | Current weather              |
| OpenStreetMap Nominatim | City geocoding               |
| Nebulum Mars Rover API  | Mars rover photos            |

---

# Application Pages

## Home

Displays natural events from the last 7 days using the NASA EONET API.

Features:

- Interactive world map
- Fire, storm and volcano filters
- Event list
- Camera fly-to animation

---

## APOD

Displays NASA Astronomy Picture of the Day.

Features:

- Image or video support
- HD image link
- Explanation
- Publication date
- Copyright information

---

## Earthquakes

Displays earthquakes with magnitude 5.5+ from the last 30 days.

Features:

- Interactive map
- Magnitude filters
- Event details
- Camera movement to selected earthquake
- USGS source link

---

## ISS

Displays the International Space Station in real time.

Features:

- 3D globe
- Live ISS position
- Automatic updates every 5 seconds
- Flight trajectory
- Automatic camera tracking

---

## Mars

Displays Mars rover photos.

Features:

- Rover selection
- Martian Sol search
- Image slider
- Camera metadata
- Empty state for unavailable photos

Supported rovers:

- Curiosity
- Perseverance

---

## Near Earth Objects

Displays today's asteroids from NASA NeoWs.

Features:

- Hazardous asteroid filter
- Estimated diameter
- Relative speed
- Miss distance
- Closest approach time
- NASA JPL link

---

## Weather

Displays current weather for cities around the world.

Features:

- Interactive map
- Weather markers
- Search by city
- Add custom cities
- Weather popup

Weather information includes:

- Temperature
- Wind speed
- Humidity
- Cloud cover

---

## Not Found

Custom 404 page with navigation back to the Home page.

---

# Components

## Nav

Application navigation.

---

## Loader

Global loading screen with a rotating 3D Earth model.

---

## Earth

Loads and animates the 3D Earth model using React Three Fiber.

---

## MapEvents

Reusable Leaflet map component.

Features:

- Dynamic markers
- Popups
- Camera animation
- Reusable across multiple pages

---

## FlyToCity

Smoothly moves the Leaflet camera to selected coordinates.

---

## WeatherPopup

Displays weather information inside a map popup.

---

# Context

## LoadingContext

Global loading manager.

Responsibilities:

- Tracks active API requests
- Prevents loader flickering
- Controls the global Loader component

---

# Helper Functions

Utility functions include:

- Earth event category badges
- Earthquake magnitude styling
- Weather icons
- Date calculations
- Formatting helpers

---

# Environment Variables

```
VITE_NASA_API_KEY=YOUR_API_KEY
```

---

# Folder Structure

```
src
│
├── api
├── assets
├── components
├── context
├── data
├── pages
├── styles
├── utils
│
├── App.jsx
└── main.jsx
```

---

# Project Highlights

- Uses multiple public APIs in one application
- Reusable component architecture
- Global loading management with Context API
- Interactive maps with Leaflet
- 3D graphics with Three.js
- Live satellite tracking
- Responsive user interface
- Modular API layer
- CSS Modules for styling

## Live Demo

[View the deployed website](https://rococo-smakager-6bdcc7.netlify.app)
