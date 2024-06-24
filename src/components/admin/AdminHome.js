import React from "react"
import styled from "styled-components"

import AddEventWidget from "./AddEventWidget"
import AddPhotoWidget from "./AddPhotoWidget"
import DeleteEventWidget from "./DeleteEventWidget"
import DeletePhotoWidget from "./DeletePhotoWidget"

export default function AdminHome() {
  return (
    <Wrapper>
      <TopRowContainer>
        <AddEventWidget />
        <AddPhotoWidget />
      </TopRowContainer>
      {/* <DeleteEventWidget />
      <DeletePhotoWidget /> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  align-items: center;
  background-color: #d1d1d6;
  border: 1px none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 1920px;
  padding: 20px;
  position: relative;
`
const TopRowContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  gap: 20px;
  justify-content: center;
  position: relative;
`
