import React from "react"
import styled from "styled-components"

export default function Photo(props) {
  const { photo } = props

  return (
    <Wrapper>
      <Image src={photo.fields.file["en-US"].url} />
      <TextWrapper>
        <Author>{photo.fields.title["en-US"]}</Author>
        <Description>
          {photo.fields.description ? photo.fields.description["en-US"] : ""}
        </Description>
      </TextWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 770px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  top: -50px;
  z-index: -1;
`
const TextWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 1;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0px 0px 0px 0.5px rgba(68, 66, 178, 0.2);
  border-radius: 10px;
  padding: 10px;
  text-align: end;
`
const Author = styled.p`
  font-size: 24px;
  color: white;
`
const Description = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.75);
`
