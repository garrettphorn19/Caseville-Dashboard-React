import React, { useState, useEffect } from "react"
import styled from "styled-components"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"

import DateWidget from "../components/widgets/DateWidget"
import SunsetWidget from "../components/widgets/SunsetWidget"
import WeatherWidget from "../components/widgets/WeatherWidget"
import TimelineWidget from "../components/widgets/TimelineWidget"
import PhotoWidget from "../components/widgets/PhotoWidget"

const contentful = require("contentful-management")

function IndexPage() {
  const today = new Date()
  const monthStr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const day = weekday[today.getDay()]
  const monthNum = today.getMonth()
  const month = monthStr[monthNum]
  const date = today.getDate()
  const year = today.getFullYear()

  setTimeout(() => {
    window.location.reload()
    console.log(
      `Window Reloaded on ${day}, ${month} ${date} at ${today.getHours}:${today.getMinutes}:${today.getSeconds}:${today.getMilliseconds}`
    )
  }, 1000000)

  return (
    <Layout>
      <Seo title="Home" />
      <Wrapper>
        <DateWidget day={day} month={month} date={date} />
        <SunsetWidget />
        <WeatherWidget />
        <TimelineWidget month={monthNum + 1} date={date} year={year} />
        <PhotoWidget />
      </Wrapper>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossorigin="anonymous"
      />
    </Layout>
  )
}

export default IndexPage

const Wrapper = styled.div`
  position: relative;
  width: 1920px;
  height: 1080px;

  margin: 0 auto;
`
