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

const Wrapper = styled.div``
