import React, { useState, useEffect } from "react"
import styled from "styled-components"

export default function WeatherWidget() {
  const latitude = process.env.GATSBY_LATITUDE
  const longitude = process.env.GATSBY_LONGITUDE
  const appId = process.env.GATSBY_WEATHER_APP_ID

  const [weather, setWeather] = useState(null)
  const [temp, setTemp] = useState(null)
  const [icon, setIcon] = useState(null)
  const [description, setDescription] = useState(null)

  // Pulls data from query and sets events state with array
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${appId}`
      )
        .then(res => res.json())
        .then(result => {
          // console.log(result)
          console.log(result)
          setWeather(result)
          setTemp(Math.ceil(result.current.temp))
          setIcon(result.current.weather[0].icon)
          setDescription(toTitleCase(result.current.weather[0].description))
        })
    }
    fetchData()
  }, [latitude, longitude, appId])

  if (!weather) {
    return "Loading Temperature..."
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  return (
    <Widget>
      <Icon src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      <Temp>{temp}º</Temp>
      <Description>{description}</Description>
    </Widget>
  )
}

const Widget = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  left: 1650px;
  top: 20px;
  background: linear-gradient(180deg, #0b84ff -4.4%, #0040dc 100%);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 25px;
`
const Icon = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 25px;
  top: 25px;
`

const Temp = styled.p`
  position: absolute;
  width: 71px;
  height: 57px;
  left: 25px;
  top: 85px;

  font-family: "SF Pro Rounded", "Open Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 57px;

  color: #ffffff;
`

const Description = styled.p`
  position: absolute;
  width: 200px;
  height: 42px;
  left: 25px;
  top: 183px;

  font-family: "SF Pro Rounded", "Open Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;

  color: #ffffff;
`
