import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Event from "./Event"

export default function TimelineWidget(props) {
  const { month, date, year } = props

  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID
  const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

  const monthStr = month.toString().length === 1 ? "0" + month : month
  const dateStr = date.toString().length === 1 ? "0" + date : date

  // Queries GraphQL data from Contentful
  const query = `
  {
    eventCollection(order: eventTime_ASC, where:{eventTime_gte:"${year}-${monthStr}-${dateStr}T00:00:00.000-00:00", eventTime_lte:"${year}-${monthStr}-${dateStr}T23:59:00.000-04:00"}) {
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
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
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
  }, [spaceId, accessToken, query])

  if (!events) {
    return "Loading Events..."
  }

  return (
    <Widget>
      {events.length === 0 ? (
        <EmptyWrapper>
          <EmptyMessage>No Events Scheduled</EmptyMessage>
        </EmptyWrapper>
      ) : (
        <Wrapper>
          {events.map((event, index) => (
            <Event event={event} key={index} />
          ))}
        </Wrapper>
      )}
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

const EmptyWrapper = styled.div`
  width: 450px;
  height: 720px;

  display: flex;

  align-items: center;
  justify-content: center;
`

const EmptyMessage = styled.p`
  font-size: 24px;
  color: rgba(0, 0, 0, 0.25);
`
