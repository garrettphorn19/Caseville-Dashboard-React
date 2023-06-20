import React from "react"
import styled from "styled-components"

import Layout from "../components/layout/layout"
import Seo from "../components/layout/seo"

import DateWidget from "../components/widgets/DateWidget"
import SunsetWidget from "../components/widgets/SunsetWidget"
import WeatherWidget from "../components/widgets/WeatherWidget"
import TimelineWidget from "../components/widgets/TimelineWidget"
import PhotoWidget from "../components/widgets/PhotoWidget"

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
  }, 1800000)

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
