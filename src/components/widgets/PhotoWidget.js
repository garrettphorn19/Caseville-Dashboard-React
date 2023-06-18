import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Carousel } from "react-responsive-carousel"

export default function PhotoWidget() {
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID
  const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

  // Queries GraphQL data from Contentful
  const query = `
  {
    imageCollection(order:timeUploaded_ASC) {
      items {
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        author
        description
        timeUploaded
      }
    }
  }
  `

  const [photos, setPhotos] = useState(null)

  // Pulls data from query and sets events state with array
  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authenticate the request
          Authorization: `Bearer ${accessToken}`,
        },
        // send the GraphQL query
        body: JSON.stringify({ query }),
      })
      .then(response => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors)
        }

        // rerender the entire component with new data
        setPhotos(data.imageCollection.items)
      })
  }, [spaceId, accessToken, query])

  if (!photos) {
    return "Loading..."
  }

  console.log(photos)

  return (
    <Widget>
      <Carousel>
        {photos.map((photo, index) => (
          <img src={photo.image.url} key={index} />
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
