import React, { useState, useReducer } from "react"
import styled from "styled-components"
import Event from "../widgets/Event"
import { Card } from "react-bootstrap"

const contentful = require("contentful-management")

export default function AddEventWidget() {
  const [enteredEventTitle, setEventTitle] = useState(null)
  const [enteredEventTime, setEventTime] = useState(null)
  const [enteredEventSubtitle, setEventSubtitle] = useState(null)
  const [enteredEventDescription, setEventDescription] = useState(null)

  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID

  function handleSubmitClick() {
    if (enteredEventTitle && enteredEventTitle !== "" && enteredEventTime) {
      const client = contentful.createClient({
        accessToken: managementAccessToken,
      })

      client
        .getSpace(spaceId)
        .then(space => space.getEnvironment("master"))
        .then(environment =>
          environment.createEntry("event", {
            fields: {
              eventTitle: {
                "en-US": enteredEventTitle,
              },
              eventTime: {
                "en-US": enteredEventTime,
              },
              eventSubtitle: {
                "en-US": enteredEventSubtitle,
              },
              eventDescription: {
                "en-US": enteredEventDescription,
              },
            },
          })
        )
        .then(entry => publishEvent(entry.sys.id))
        .catch(console.error)

      setTimeout(() => {
        window.location.reload()
      }, 5000)
    }
  }

  function publishEvent(id) {
    const client = contentful.createClient({
      accessToken: managementAccessToken,
    })

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment => environment.getEntry(id))
      .then(entry => entry.publish())
      .then(() => console.log(`Entry ${id} published.`))
      .catch(console.error)
  }

  const event = {
    eventTitle: enteredEventTitle,
    eventTime: enteredEventTime,
    eventSubtitle: enteredEventSubtitle,
    eventDescription: enteredEventDescription,
  }

  return (
    <Widget bg="danger">
      <Title className="text-center">Add Event</Title>
      <ContentContainer>
        <TopRowContainer>
          <Input>
            <input
              type="text"
              name="eventTitleInput"
              placeholder="Title"
              onChange={event => {
                setEventTitle(event.target.value)
              }}
            />
          </Input>
          <Input>
            <input
              type="datetime-local"
              name="eventTimeInput"
              placeholder="Date/Time"
              onChange={event => {
                setEventTime(event.target.value + ":00.000-04:00")
                console.log(enteredEventTime)
              }}
            />
          </Input>
        </TopRowContainer>
        <MiddleRowContainer>
          <SubtitleInput>
            <input
              type="text"
              name="eventSubtitleInput"
              placeholder="Subtitle"
              onChange={event => {
                setEventSubtitle(event.target.value)
              }}
            />
          </SubtitleInput>
        </MiddleRowContainer>
        <BottomRowContainer>
          <DescriptionInput>
            <textarea
              name="eventDescriptionInput"
              placeholder="Description"
              onChange={event => {
                setEventDescription(event.target.value)
              }}
            />
          </DescriptionInput>
        </BottomRowContainer>
        <PreviewContainer>
          <Event className="preview" event={event} />
        </PreviewContainer>
        <Button onClick={handleSubmitClick}>Submit</Button>
      </ContentContainer>
    </Widget>
  )
}
const Widget = styled.div`
  align-items: center;
  background: linear-gradient(
    180deg,
    rgb(255, 74.37, 74.37) 0%,
    rgb(168.94, 0, 0) 100%
  );
  border-radius: 25px;
  box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
    inset 0px 0px 0px 0.5px #ffffff80;
  display: flex;
  flex-direction: column;
  height: 700px;
  justify-content: space-between;
  overflow: hidden;
  padding: 20px;
  position: relative;
`

const Title = styled.p`
  color: #ffffff;
  font-family: "SF Pro Rounded-Bold", "Open Sans";
  font-size: 48px;
  font-weight: 700;
  line-height: normal;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 36px 50px;
`

const TopRowContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`

const MiddleRowContainer = styled.div`
  /* align-items: center; */
  /* display: flex; */
  /* gap: 10px; */
  /* justify-content: center; */
  /* position: relative; */
  /* width: 498px; */
`

const BottomRowContainer = styled.div`
  /* align-items: center; */
  /* display: flex; */
  /* gap: 10px; */
  /* justify-content: center; */
  /* position: relative; */
  /* width: 498px; */
`

const Input = styled.div`
  input {
    width: 214px;
    height: 24px;
    align-items: center;
    background-color: #ffffff;
    border: none;
    border-radius: 25px;
    box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
      inset 0px 0px 0px 0.5px #ffffff80;
    display: flex;
    flex: 1;
    gap: 10px;
    overflow: hidden;
    padding: 21px 15px;
    position: relative;
  }
`

const SubtitleInput = styled.div`
  input {
    width: 468px;
    height: 24px;
    align-items: center;
    background-color: #ffffff;
    border: none;
    border-radius: 25px;
    box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
      inset 0px 0px 0px 0.5px #ffffff80;
    display: flex;
    flex: 1;
    gap: 10px;
    overflow: hidden;
    padding: 21px 15px;
    position: relative;
  }
`
const DescriptionInput = styled.div`
  textarea {
    width: 468px;
    height: 78px;
    align-items: flex-start;
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
      inset 0px 0px 0px 0.5px #ffffff80;
    display: flex;
    flex: 1;
    gap: 10px;
    overflow: hidden;
    padding: 21px 15px;
    position: relative;
  }
`

const PreviewContainer = styled.div`
  align-items: center;
  background-color: #ffffff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  overflow: hidden;
  padding: 13px 24px;
  position: relative;
  width: fit-content;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }
`

const Button = styled.div`
  align-items: center;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
    inset 0px 0px 0px 0.5px #ffffff80;
  display: flex;
  gap: 20px;
  justify-content: center;
  overflow: hidden;
  padding: 10px 20px;
  position: relative;
  width: fit-content;

  color: #000000;
  font-family: "SF Pro Rounded-Bold", Helvetica;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0;
  line-height: normal;
  text-align: center;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.95) translateY(5px);
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }
`
