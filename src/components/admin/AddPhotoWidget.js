import React, { useState } from "react"
import styled from "styled-components"

const contentful = require("contentful-management")

export default function AddPhotoWidget() {
  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID

  const [photoAuthor, setAuthor] = useState(null)
  const [photoDescription, setDescription] = useState(null)
  const [photoUploadTime, setUploadTime] = useState(null)
  const [selectedPhoto, setPhoto] = useState(null)

  function authorChangedHandler(event) {
    setAuthor(event.target.value)
  }

  function descriptionChangedHandler(event) {
    setDescription(event.target.value)
  }

  function timeChangedHandler(event) {
    setUploadTime(event.target.value)
  }

  function fileChangedHandler(event) {
    setPhoto(event.target.files[0])
  }

  function handleSubmitClick() {
    const client = contentful.createClient({
      accessToken: managementAccessToken,
    })

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment =>
        environment.createAssetFromFiles({
          fields: {
            title: {
              "en-US": photoDescription,
            },
            description: {
              "en-US": photoAuthor,
            },
            file: {
              "en-US": {
                contentType: selectedPhoto.type,
                fileName: selectedPhoto.name,
                file: selectedPhoto,
              },
            },
          },
        })
      )
      .then(asset => asset.processForAllLocales())
      .then(asset => asset.publish())
      .then(asset => console.log(asset))
      .catch(console.error)
  }

  return (
    <Wrapper>
      <Title>Add Photo</Title>
      <InputWrapper>
        <input
          type="text"
          placeholder="Author"
          onChange={authorChangedHandler}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={descriptionChangedHandler}
        />
        <InputWrapper>
          <input
            type="datetime-local"
            name="eventTimeInput"
            onChange={timeChangedHandler}
            hidden
          />
        </InputWrapper>
        <input type="file" onChange={fileChangedHandler} />
        <Button onClick={handleSubmitClick}>Submit</Button>
      </InputWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background: purple;
  padding: 15px;
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-gap: 50px;
  align-items: center;
  justify-content: start;
  padding: 25px;
  border: none;
  border-radius: 15px;

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, auto);
  }
`

const Title = styled.p`
  color: white;
  font-size: 24px;
  font-weight: 600;
  padding: 0 0 15px;
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
