import React from "react"
import styled from "styled-components"

export default function AddEventWidget() {
  return (
    <Wrapper>
      <form>
        <input type="image" alt="image" />
        <button type="submit">Upload</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: red;
`
