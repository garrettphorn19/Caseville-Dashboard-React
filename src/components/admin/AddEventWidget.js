import React, { useState } from "react"
import styled from "styled-components"
import Event from "../widgets/Event"

const contentful = require("contentful-management")

export default function AddEventWidget() {
  const [enteredEventTitle, setEventTitle] = useState(null)
  const [enteredEventTime, setEventTime] = useState(null)
  const [enteredEventSubtitle, setEventSubtitle] = useState(null)
  const [enteredEventDescription, setEventDescription] = useState(null)
  const [entryId, setEntryId] = useState(null)

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
        // .then(entry => console.log(entry.sys.id))
        .then(entry => setEntryId(entry.sys.id))
        .catch(console.error)

      client
        .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
        .then(space => space.getEnvironment("master"))
        .then(environment => environment.getEntry(entryId))
        .then(entry => entry.publish())
        .then(() => console.log(`Entry ${entryId} published.`))
        .catch(console.error)

      setEventTitle(null)
      setEventTime(null)
      setEventSubtitle(null)
      setEventDescription(null)
      // window.location.reload()
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
          <input
            type="text"
            name="eventTitleInput"
            placeholder="Title"
            onChange={event => {
              setEventTitle(event.target.value)
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="datetime-local"
            name="eventTimeInput"
            onChange={event => {
              setEventTime(event.target.value)
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            name="eventSubtitleInput"
            placeholder="Subtitle"
            onChange={event => {
              setEventSubtitle(event.target.value)
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <textarea
            name="eventDescriptionInput"
            placeholder="Description"
            onChange={event => {
              setEventDescription(event.target.value)
            }}
          />
        </InputWrapper>
      </EditWrapper>
      <PreviewWrapper>
        <Event className="preview" event={event} />
        <Button onClick={handleSubmitClick}>Submit</Button>
      </PreviewWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background: red;
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 50px;
  align-items: center;
  padding: 25px;
  border: none;
  border-radius: 15px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, auto);
  }
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

  input {
    height: 50px;
    width: 450px;
    font-size: 18px;
    padding: 5px 15px;
    border: none;
    border-radius: 15px;

    @media (max-width: 500px) {
      width: 300px;
    }
  }

  textarea {
    height: 100px;
    width: 450px;
    font-size: 18px;
    padding: 5px 15px;
    border: none;
    border-radius: 15px;

    @media (max-width: 500px) {
      width: 300px;
    }
  }
`

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  align-items: center;
  justify-content: center;
`

const Button = styled.div`
  width: 150px;
  padding: 15px 15px;
  background: white;
  border-radius: 15px;
  text-align: center;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.05) translateY(-5px);
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
