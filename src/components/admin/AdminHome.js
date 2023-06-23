import React from "react"
import styled from "styled-components"

import AddEventWidget from "./AddEventWidget"
import AddPhotoWidget from "./AddPhotoWidget"

export default function AdminHome() {
  return (
    <Wrapper>
      <AddEventWidget />
      <AddPhotoWidget />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: repeat(2, auto);
  align-items: center;
  justify-content: center;
`
