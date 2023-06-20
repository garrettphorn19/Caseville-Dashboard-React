import React from "react"
import styled from "styled-components"

export default function DateWidget(props) {
  const { day, month, date } = props
  return (
    <Widget>
      <Title>
        {day}, {month} {date}
      </Title>
    </Widget>
  )
}

const Widget = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* padding: 23px 93px; */
  gap: 10px;

  position: absolute;
  width: 1339px;
  height: 249px;
  left: 20px;
  top: 20px;

  background: #ffffff;
  /* Widget Shadow

Shadows for widgets
*/
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 25px;
`
const Title = styled.h1`
  height: 203px;

  font-family: "SF Pro Rounded";
  font-style: normal;
  font-weight: 600;
  font-size: 96px;
  line-height: 203px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`
