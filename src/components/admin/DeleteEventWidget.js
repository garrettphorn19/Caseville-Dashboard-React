import React, { useEffect, useState } from "react"
import styled from "styled-components"
import EventEdit from "./EventEdit"
const contentful = require("contentful-management")

export default function DeleteEventWidget() {
  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID

  const [eventArray, setEventArray] = useState(null)

  useEffect(() => {
    const client = contentful.createClient({
      accessToken: managementAccessToken,
    })

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment =>
        environment.getPublishedEntries({ content_type: "event" })
      )
      .then(response => setEventArray(response.items))
      .catch(console.error)
  }, [managementAccessToken, spaceId])

  if (!eventArray) {
    return "Loading Events..."
  }

  return (
    <Widget>
      <Title>Delete Event</Title>
      <ContentContainer>
        <EventContainer>
          {eventArray.map((event, index) => (
            <EventEdit event={event} key={index} />
          ))}
        </EventContainer>
      </ContentContainer>
    </Widget>
  )
}

const Widget = styled.div`
  align-items: center;
  background: linear-gradient(
    180deg,
    rgb(255, 218.07, 87.13) 0%,
    rgb(177.44, 138.4, 0) 100%
  );
  border-radius: 25px;
  box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
    inset 0px 0px 0px 0.5px #ffffff80;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* overflow: hidden; */
  padding: 20px;
  position: relative;
  width: 1880px;
`

const Title = styled.p`
  color: #ffffff;
  font-family: "SF Pro Rounded-Bold", "Open Sans";
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  margin-top: -1px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
`

const ContentContainer = styled.div`
  width: 1840px;
  align-items: center;
  border-radius: 25px;
  gap: 20px;
  justify-content: center;
`

const EventContainer = styled.div`
  align-items: center;
  border-radius: 25px;

  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 10px;
  justify-content: center;
  width: 100%;
`
