import React from "react"
import styled from "styled-components"

export default function PhotoWidget() {
  return <Widget></Widget>
}

const Widget = styled.div`
  position: absolute;
  width: 1360px;
  height: 770px;
  left: 540px;
  top: 290px;

  background: #ffffff;
  box-shadow: inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 20px 40px rgba(23, 0, 102, 0.2));
  border-radius: 25px;
`
