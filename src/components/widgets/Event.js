import React, { useState, useEffect } from "react"
import styled from "styled-components"

export default function Event(props) {
  const { event } = props

  const [isActive, setActive] = useState(false)

  // Converts time data to readable time
  const timestamp = new Date(event.eventTime)
  const hours =
    timestamp.getHours() > 12 ? timestamp.getHours() - 12 : timestamp.getHours()
  const minutes =
    timestamp.getMinutes() < 10
      ? "0" + timestamp.getMinutes()
      : timestamp.getMinutes()
  const time = `${hours}:${minutes}`

  const currentTime = new Date()

  const nowUnix = convertToUnix(currentTime)
  const eventUnix = convertToUnix(timestamp)

  function convertToUnix(time) {
    return Math.floor(new Date(time).getTime() / 1000)
  }

  useEffect(() => {
    if (nowUnix >= eventUnix - 600 && nowUnix <= eventUnix + 3000) {
      setActive(true)
    }
  }, [eventUnix, nowUnix])

  return (
    <EventWrapper active={isActive}>
      <TextWrapper>
        <TopRow>
          <TimeWrapper>
            <Time>{time}</Time>
          </TimeWrapper>
          <Title>{event.eventTitle}</Title>
        </TopRow>
        <Divider />
        <Subtitle>{event.eventSubtitle}</Subtitle>
        <Description>{event.eventDescription}</Description>
      </TextWrapper>
    </EventWrapper>
  )
}

const EventWrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;

  width: 450px;
  height: 127px;

  background: ${props => (props.active ? "rgba(68, 66, 178, 0.1)" : "#FFFFFF")};
  box-shadow: ${props =>
    props.active ? "inset 0px 0px 0px 0.5px rgba(68, 66, 178, 0.2)" : "none"};
  border-radius: 10px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 500px) {
    transform: scale(0.75);
  }
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  width: 293px;
  height: 107px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  /* width: 243px; */
  height: 36px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  gap: 10px;

  width: 65px;
  height: 36px;

  background: rgba(68, 66, 179, 0.1);
  background-blend-mode: overlay;
  border-radius: 5px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`

const Time = styled.p`
  width: 42px;
  height: 24px;
  font-family: "SF Pro Rounded", "Open Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
`

const Title = styled.p`
  width: 179px;
  height: 36px;
  font-family: "SF Pro Rounded", "Open Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: #3913b8;
  flex: none;
  order: 1;
  flex-grow: 0;
`

const Divider = styled.div`
  width: 293px;
  height: 5px;

  background: rgba(68, 66, 179, 0.5);
  background-blend-mode: overlay;
  border-radius: 8px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`

const Subtitle = styled.p`
  width: 231px;
  height: 24px;

  /* Event Subtitle Text */

  font-family: "SF Pro Rounded", "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 2;
  flex-grow: 0;
`

const Description = styled.p`
  width: 231px;
  height: 18px;

  /* Event Description Text */

  font-family: "SF Pro Rounded";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  color: #192150;

  /* Inside auto layout */

  flex: none;
  order: 3;
  flex-grow: 0;
`
