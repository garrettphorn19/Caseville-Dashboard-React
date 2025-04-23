import React, { useState, useEffect } from "react"
import styled from "styled-components"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import Photo from "./Photo"

const contentful = require("contentful-management")

export default function PhotoWidget() {
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID
  const managementAccessToken = process.env.GATSBY_CONTENTFUL_MANAGEMENT_KEY

  const [photos, setPhotos] = useState(null)

  useEffect(() => {
    const client = contentful.createClient({
      accessToken: managementAccessToken,
    })

    client
      .getSpace(spaceId)
      .then(space => space.getEnvironment("master"))
      .then(environment => environment.getAssets())
      .then(response => setPhotos(response.items))
      .catch(console.error)
  }, [spaceId, managementAccessToken])

  if (!photos) {
    return "Loading Photos..."
  }

  console.log(photos)

  return (
    <Widget>
      <Carousel
        autoPlay={true}
        interval={5000}
        infiniteLoop={true}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        {photos.map((photo, index) => (
          <Photo photo={photo} key={index} />
        ))}
      </Carousel>
    </Widget>
  )
}

const Widget = styled.div`
  position: absolute;
  width: 1360px;
  height: 770px;
  left: 540px;
  top: 290px;

  background: "#FFFFFF";
  box-shadow: inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 20px 40px rgba(23, 0, 102, 0.2));
  border-radius: 25px;

  overflow: hidden;
`
