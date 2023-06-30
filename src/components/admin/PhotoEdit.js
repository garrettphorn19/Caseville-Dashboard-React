import React, { useEffect, useState } from "react"
import styled from "styled-components"
const contentful = require("contentful-management")

export default function PhotoEdit(props) {
  var { photo } = props

  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID

  const [assetId, setAssetId] = useState(null)
  const [assetLink, setAssetLink] = useState(null)
  const [entryId, setEntryId] = useState(null)

  function handleDeleteClick() {
    const client = contentful.createClient({
      accessToken: managementAccessToken,
    })

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment => environment.getEntry(photo.sys.id))
      .then(entry => entry.unpublish())
      .then(entry => console.log(`Entry ${entry.sys.id} unpublished.`))
      .catch(console.error)

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment => environment.getEntry(photo.sys.id))
      .then(entry => entry.delete())
      .then(() => console.log(`Photo: ${photo.sys.id} was deleted`))
      .catch(console.error)

    setTimeout(() => {
      window.location.reload()
    }, 5000)
  }

  useEffect(() => {
    const client = contentful.createClient({
      accessToken: managementAccessToken,
    })

    setAssetId(photo.fields.image["en-US"].sys.id)
    setEntryId(photo.sys.id)

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment => environment.getAsset(assetId))
      .then(asset => setAssetLink(asset.fields.file["en-US"].url))
      .catch(console.error)
  })

  return (
    <EventWrapper>
      <Image src={assetLink} />
      <Button onClick={handleDeleteClick}>
        <svg
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75 13H10.9167H44.25"
            stroke="#B90000"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40.0833 13V42.1667C40.0833 43.2718 39.6443 44.3316 38.8629 45.113C38.0815 45.8944 37.0217 46.3334 35.9167 46.3334H15.0833C13.9783 46.3334 12.9185 45.8944 12.1371 45.113C11.3557 44.3316 10.9167 43.2718 10.9167 42.1667V13M17.1667 13V8.83335C17.1667 7.72829 17.6057 6.66848 18.3871 5.88708C19.1685 5.10567 20.2283 4.66669 21.3333 4.66669H29.6667C30.7717 4.66669 31.8315 5.10567 32.6129 5.88708C33.3943 6.66848 33.8333 7.72829 33.8333 8.83335V13"
            stroke="#B90000"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.3333 23.4167V35.9167"
            stroke="#B90000"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29.6667 23.4167V35.9167"
            stroke="#B90000"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </EventWrapper>
  )
}

const EventWrapper = styled.div`
  position: relative;
  box-sizing: border-box;

  width: 450px;
  height: 127px;

  box-shadow: inset 0px 0px 0px 0.5px rgba(68, 66, 178, 0.2);
  border-radius: 10px;

  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }
`

const Image = styled.div`
  position: relative;

  width: 100%;
`

const Button = styled.div`
  position: absolute;
  right: 10px;
  top: 26px;
  height: 75px;
  width: 75px;
  background-color: rgba(253, 120, 120, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: scale(1.02) translateY(-2px);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: scale(0.95) translateY(5px);
    background: rgba(185, 0, 0, 1);
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 20px 40px rgba(23, 0, 102, 0.2),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  }
`
