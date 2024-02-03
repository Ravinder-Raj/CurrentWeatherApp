import React, { useState, useEffect } from "react";
import loc from "../img/loc.gif";
import clearSky from "../weathersBg/clearSky.jpg";

import rain from "../weathersBg/Rain.jpg";
import snow from "../weathersBg/Snow.jpg";
import sleet from "../weathersBg/Sleet.jpg";

import thunderstorm from "../weathersBg/Thunderstorm.jpg";
import fog from "../weathersBg/Fog.jpg";

import defaultImage from "../weathersBg/weat.jpg";
import driz from "../weathersBg/Drizzle.jpg";
import snowshower from "../weathersBg/snowshower.jpg";
import Flurries from "../weathersBg/flurries.jpg";
import mist from "../weathersBg/mist.jpg";
import haze from "../weathersBg/haze.jpg";
import dust from "../weathersBg/dust.jpg";
import freezefog from "../weathersBg/freezefog.jpg";
import fewclouds from "../weathersBg/fewclouds.jpg";
import overcast from "../weathersBg/overcast.jpg";

const Getweather = (props) => {
  const [lati, setLat] = useState();
  const [longi, setLongi] = useState();
  const [location, setLocation] = useState("...");
  const [description, setDescription] = useState("...");
  const [temp, setTemp] = useState("...");
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);
  const images = {
    "Thunderstorm with light rain": thunderstorm,
    "Thunderstorm with rain": thunderstorm,
    "Thunderstorm with heavy rain": thunderstorm,
    "Thunderstorm with light drizzle": thunderstorm,
    "Thunderstorm with drizzle": thunderstorm,
    "Thunderstorm with heavy drizzle": thunderstorm,
    "Thunderstorm with Hail": thunderstorm,
    "Light Drizzle": driz,
    Drizzle: driz,
    "Heavy Drizzle": driz,
    "Light Rain": rain,
    "Moderate Rain": rain,
    "Heavy Rain": rain,
    "Freezing rain": rain,
    "Light shower rain": rain,
    "Shower rain": rain,
    "Heavy shower rain": rain,
    "Light Snow": snow,
    Snow: snow,
    "Heavy Snow": snow,
    "Mix snow/rain": snow,
    Sleet: sleet,
    "Heavy sleet": sleet,
    "Snow shower": snowshower,
    "Heavy snow shower": snowshower,
    Flurries: Flurries,
    Mist: mist,
    Smoke: mist,
    Haze: haze,
    "Sand/dust": dust,
    Fog: fog,
    "Freezing Fog": freezefog,
    "Clear sky": clearSky,
    "Few clouds": fewclouds,
    "Scattered clouds": fewclouds,
    "Broken clouds": fewclouds,
    "Overcast clouds": overcast,
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLat(lat);
        setLongi(long);
        console.log("Latitude:" + lat, "Longitude:" + long);
        getLoc(lat, long);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const getLoc = async (lat, long) => {
    
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=55f26aaa44914ba19193bc91537eebdc&include=minutely`;

    try {
      const data = await fetch(url);
      const parseData = await data.json();
      const newDescription =
        parseData?.data[0]?.weather?.description || "Unknown Description";
      const city = parseData?.data[0]?.city_name || "Unknown City";
      const temperature = parseData?.data[0]?.temp || "Unknown City";
      setTemp(temperature + " C");
      setLocation(city);

      setDescription(newDescription);
      console.log("Weather Description set to:", newDescription);
      console.log(temperature);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    changeBackground();
  }, [description]); // Listen for changes in the 'description' state

  const changeBackground = () => {
    console.log("Trying to change background with description:", description);
    setBackgroundImage(images[description] || defaultImage);
    console.log("Background Image Set:", backgroundImage);
  };

  return (
    <div>
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-sm bg-transparent  backdrop-blur-md border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={loc}
              alt="Location"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Find your location and Weather
            </h5>
            <span className="text-sm text-black dark:text-gray-400">
              Click ALLOW to prompt window
            </span>
            <div id="loc" className="flex mt-4 md:mt-6">
              <button
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={getLocation}
              >
                Get Weather
              </button>
            </div>
            <div className="mt-2">
              Location: {location}
              <br />
              Weather: {description}
              <br />
              Temperature: {temp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Getweather;
