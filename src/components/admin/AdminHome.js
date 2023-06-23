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
  grid-gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px;
`
