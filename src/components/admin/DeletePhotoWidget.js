import React, { useState, useEffect } from "react"
import styled from "styled-components"
import PhotoEdit from "./PhotoEdit"
import Photo from "../widgets/Photo"
const contentful = require("contentful-management")

export default function DeletePhotoWidget() {
  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID

  const [photoArray, setPhotoArray] = useState(null)

  useEffect(() => {
    const client = contentful.createClient({
      accessToken: managementAccessToken,
    })

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment =>
        environment.getPublishedEntries({ content_type: "image" })
      )
      .then(response => setPhotoArray(response.items))
      .catch(console.error)
  }, [managementAccessToken, spaceId])

  if (!photoArray) {
    return "Loading Photo..."
  }

  console.log(photoArray)

  return (
    <Widget>
      <Title>Delete Photo</Title>
      <ContentContainer>
        {photoArray.map((photo, index) => (
          <PhotoEdit photo={photo} key={index} />
        ))}
      </ContentContainer>
    </Widget>
  )
}

const Widget = styled.div`
  align-items: center;
  background: linear-gradient(
    180deg,
    rgb(71.12, 143.44, 87.03) 0%,
    rgb(0, 74.37, 16.36) 100%
  );
  border-radius: 25px;
  box-shadow: 0px 20px 40px #17006633, 0px 1px 3px #0000001a,
    inset 0px 0px 0px 0.5px #ffffff80;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 20px;
  position: relative;
  width: 1880px;
`

const Title = styled.p`
  color: #ffffff;
  font-family: "SF Pro Rounded-Bold", Helvetica;
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
  align-items: center;
  background-color: #ffffff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  left: 465px;
  overflow: hidden;
  position: absolute;
  top: 10px;
  width: fit-content;
`

const PhotoContainer = styled.div`
  align-items: center;
  background-color: #ffffff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  left: 925px;
  overflow: hidden;
  position: absolute;
  top: 10px;
  width: fit-content;
`
