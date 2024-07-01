import React from "react"
import styled from "styled-components"

import AddEventWidget from "./AddEventWidget"
import AddPhotoWidget from "./AddPhotoWidget"

export default function AdminHome() {
  return (
    <Wrapper>
      <TopRowContainer>
        <AddPhotoWidget />
        <AddEventWidget />
      </TopRowContainer>
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
  padding: 20px;
  position: relative;
`

const TopRowContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: grid;
  gap: 20px;
  justify-content: center;
  position: relative;
`
