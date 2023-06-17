import React from "react"
import styled from "styled-components"
import { CloudinaryContext, Image } from "cloudinary-react"

export default function AddPhotoWidget() {
  return (
    <Wrapper>
      <h1>Photo Upload</h1>
      <CloudinaryContext cloudName="dnosji1w5">
        <div>
          <Image publicId="sample" width="50" />
        </div>
        <Image publicId="sample" width="0.5" />
      </CloudinaryContext>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: purple;
`
