import React from "react"
import styled from "styled-components"

export default function SunsetWidget() {
  return <Widget></Widget>
}

const Widget = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  left: 1380px;
  top: 20px;

  /* Sky Red

Sunset Widget Sky
*/
  background: #d20f44;
  /* Widget Shadow

Shadows for widgets
*/
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 25px;
`
