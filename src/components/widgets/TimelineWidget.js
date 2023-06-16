import React from "react"
import styled from "styled-components"

export default function TimelineWidget() {
  return <Widget></Widget>
}

const Widget = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px;
  gap: 10px;

  position: absolute;
  width: 500px;
  height: 770px;
  left: 20px;
  top: 290px;

  background: #ffffff;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 25px;
`
