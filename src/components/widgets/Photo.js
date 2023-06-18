import React from "react"
import styled from "styled-components"

export default function Photo(props) {
  const { photo } = props

  return (
    <Wrapper>
      <Image src={photo.image.url} />
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Image = styled.img`
  position: relative;
  width: 100%;
  top: -50px;
`
