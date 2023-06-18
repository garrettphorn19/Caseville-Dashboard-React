import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Event from "./Event"
// import "dotenv/config"

export default function TimelineWidget() {
  const siteId = process.env.GATSBY_CONTENTFUL_SPACE_ID
  const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

  // Queries GraphQL data from Contentful
  const query = `
  {
    eventCollection(order: eventTime_ASC) {
      items {
        eventTitle
         eventTime
        eventSubtitle
        eventDescription
      }
    }
  }
  `

  const [events, setEvents] = useState(null)

  // Pulls data from query and sets events state with array
  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${siteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${accessToken}`,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then(response => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors)
        }

        // rerender the entire component with new data
        setEvents(data.eventCollection.items)
      })
  }, [siteId, accessToken, query])

  return (
    <Widget>
      <Wrapper>
        {events.map((event, index) => (
          <Event event={event} key={index} />
        ))}
      </Wrapper>
    </Widget>
  )
}

const Widget = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px;
  gap: 10px;

  position: absolute;
  width: 500px;
  height: 770px;
  left: 20px;
  top: 290px;

  background: #ffffff;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 25px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 450px;
  height: 720px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`
