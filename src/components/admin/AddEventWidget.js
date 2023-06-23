import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Event from "../widgets/Event"

const contentful = require("contentful-management")

export default function AddEventWidget() {
  const [enteredEventTitle, setEventTitle] = useState(null)
  const [enteredEventTime, setEventTime] = useState(null)
  const [enteredEventSubtitle, setEventSubtitle] = useState(null)
  const [enteredEventDescription, setEventDescription] = useState(null)

  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY

  function handleSubmitClick() {
    if (enteredEventTitle && enteredEventTitle !== "" && enteredEventTime) {
      const client = contentful.createClient({
        accessToken: managementAccessToken,
      })

      client
        .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
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
        .then(entry => console.log(entry))
        .catch(console.error)

      setEventTitle(null)
      setEventTime(null)
      setEventSubtitle(null)
      setEventDescription(null)
    }
  }

  const event = {
    eventTitle: enteredEventTitle,
    eventTime: enteredEventTime,
    eventSubtitle: enteredEventSubtitle,
    eventDescription: enteredEventDescription,
  }

  return (
    <Wrapper>
      <EditWrapper>
        <InputWrapper>
          <label>Title</label>
          <input
            type="text"
            name="eventTitleInput"
            onChange={event => {
              setEventTitle(event.target.value)
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Start Time</label>
          <input
            type="datetime-local"
            name="eventTimeInput"
            onChange={event => {
              setEventTime(event.target.value)
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Subtitle</label>
          <input
            type="text"
            name="eventSubtitleInput"
            onChange={event => {
              setEventSubtitle(event.target.value)
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <label>Description</label>
          <textarea
            name="eventDescriptionInput"
            onChange={event => {
              setEventDescription(event.target.value)
            }}
          />
        </InputWrapper>
        <Button onClick={handleSubmitClick}>Submit</Button>
      </EditWrapper>
      <PreviewWrapper>
        <Event event={event} />
      </PreviewWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: red;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 50px;
  align-items: center;
`

const EditWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-gap: 10px;
  justify-content: center;
`

const InputWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-gap: 5px;
  justify-content: center;
`

const PreviewWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-gap: 10px;
  justify-content: center;
`

const Button = styled.div``
