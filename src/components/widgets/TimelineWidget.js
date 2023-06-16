import React from "react"
import styled from "styled-components"
import Event from "./Event"

export default function TimelineWidget() {
  const events = [
    {
      title: "Golf",
      time: "6:33",
      subtitle: "Bird Creek",
      description: "Three Team Scramble",
      active: false,
    },
    {
      title: "Breakfast",
      time: "8:30",
      subtitle: "Matt & Regina",
      description: "Waffle bar & Bacon",
      active: false,
    },
    {
      title: "Lunch",
      time: "1:00",
      subtitle: "Jamie & Nicole",
      description: "Italian Subs & Side Salad",
      active: true,
    },
    {
      title: "Snack",
      time: "4:00",
      subtitle: "Austin & Max",
      description: "Buffalo Chicken Dip",
      active: false,
    },
    {
      title: "Dinner",
      time: "8:30",
      subtitle: "Garrett & Andie",
      description: "Chicken Parmesean",
      active: false,
    },
  ]

  return (
    <Widget>
      <Wrapper>
        {events.map((event, index) => (
          <Event event={event} />
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
