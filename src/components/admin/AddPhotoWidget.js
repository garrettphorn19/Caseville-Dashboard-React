import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Spinner from "react-bootstrap/Spinner"

const contentful = require("contentful-management")

export default function AddPhotoWidget() {
  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID

  const [photoAuthor, setAuthor] = useState(null)
  const [photoDescription, setDescription] = useState(null)
  const [photoUploadTime, setUploadTime] = useState(null)
  const [selectedPhoto, setPhoto] = useState(null)
  const [currentAssetId, setCurrentAssetId] = useState(null)
  const [preview, setPreview] = useState()
  const [isSubmitting, setSubmitting] = useState(false)

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
    setSubmitting(true)

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
      .catch(console.error)

    setPhoto(null)

    setTimeout(() => setSubmitting(false), 2000)
  }

  useEffect(() => {
    if (!selectedPhoto) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedPhoto)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedPhoto])

  return isSubmitting ? (
    <Widget>
      <Title>Add Photo</Title>
      <ContentContainer>
        <Spinner />
      </ContentContainer>
    </Widget>
  ) : (
    <Widget>
      <Title>Add Photo</Title>
      <ContentContainer>
        <InputField>
          <input
            type="text"
            placeholder="Author"
            onChange={authorChangedHandler}
          />
        </InputField>
        <InputField>
          <input
            type="text"
            placeholder="Description"
            onChange={descriptionChangedHandler}
          />
        </InputField>
        <PhotoPreviewContainer>
          <PreviewImage id="PhotoPreviewContainer" src={preview} />
        </PhotoPreviewContainer>
        <input
          type="datetime-local"
          name="eventTimeInput"
          onChange={timeChangedHandler}
          hidden
        />
        <ButtonContainer>
          <ChooseButton>
            <label htmlFor="photoUpload">
              <input
                accept="image/*"
                type="file"
                id="photoUpload"
                onChange={fileChangedHandler}
              />
              Choose Photo
            </label>
          </ChooseButton>
          <SubmitButton onClick={handleSubmitClick}>Submit</SubmitButton>
        </ButtonContainer>
      </ContentContainer>
    </Widget>
  )
}

const Widget = styled.div`
  align-items: center;
  background: linear-gradient(
    180deg,
    rgb(190.8, 86.06, 255) 0%,
    rgb(93.54, 0, 150.87) 100%
  );

  border-radius: 25px;
  box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
    inset 0px 0px 0px 0.5px #ffffff80;

  display: flex;
  flex-direction: column;

  height: 693px;
  padding: 20px;
`

const Title = styled.p`
  color: #ffffff;
  font-family: "SF Pro Rounded-Bold", "Open Sans";
  font-size: 48px;
  font-weight: 700;
  line-height: normal;
`

const ContentContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 36px;
`

const InputField = styled.div`
  input {
    width: 480px;
    height: 24px;

    border: none;
    border-radius: 25px;
    box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
      inset 0px 0px 0px 0.5px #ffffff80;

    padding: 21px 15px;

    @media (max-width: 450px) {
      width: 310px;
    }
  }
`

const PhotoPreviewContainer = styled.div`
  display: flex;
  border-radius: 25px;
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }
`

const PreviewImage = styled.img`
  background: transparent;
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 25px;
  box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
    inset 0px 0px 0px 0.5px #ffffff80;
  height: 288px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`

const ChooseButton = styled.div`
  input[type="file"] {
    display: none;
  }

  label {
    font-family: "SF Pro Rounded-Bold", "Open Sans";
    font-size: 24px;
    font-weight: 700;
    background-color: #ffffff;
    border-radius: 25px;
    box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
      inset 0px 0px 0px 0.5px #ffffff80;
    display: inline-block;
    padding: 10px 20px;
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
  }
`

const SubmitButton = styled.div`
  font-family: "SF Pro Rounded-Bold", "Open Sans";
  font-size: 24px;
  font-weight: 700;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
    inset 0px 0px 0px 0.5px #ffffff80;
  padding: 10px 20px;
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
