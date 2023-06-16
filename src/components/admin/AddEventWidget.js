import React from "react"
import styled from "styled-components"

export default function AddEventWidget() {
  return (
    <Wrapper>
      <input type="file" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: red;
`
