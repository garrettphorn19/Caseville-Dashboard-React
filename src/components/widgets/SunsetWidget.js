import React from "react"
import styled from "styled-components"

export default function SunsetWidget() {
  const sunriseTime = "6:43"
  const sunsetTime = "9:07"

  return (
    <Widget>
      <TopTimeWrapper className="top">
        <Icon src="/images/icons/icon-sunrise.svg" />
        <Time>{sunriseTime}</Time>
      </TopTimeWrapper>
      <Sun />
      <Water />
      <BottomTimeWrapper className="bottom">
        <Icon src="/images/icons/icon-sunset.svg" />
        <Time>{sunsetTime}</Time>
      </BottomTimeWrapper>
    </Widget>
  )
}

const Widget = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  left: 1380px;
  top: 20px;
  overflow: hidden;

  background: #d20f44;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 20px 40px rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  border-radius: 25px;
`
const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 9px;

  position: absolute;
  width: 88px;
  height: 30px;
`

const TopTimeWrapper = styled(TimeWrapper)`
  left: calc(50% - 88px / 2);
  top: 25px;
`

const BottomTimeWrapper = styled(TimeWrapper)`
  left: calc(50% - 87px / 2 + 0.5px);
  top: 195px;
`

const Icon = styled.img`
  width: 25px;
  height: 25px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

const Time = styled.p`
  width: 54px;
  height: 30px;

  font-family: "SF Pro Rounded";
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  /* identical to box height */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`

const Sun = styled.div`
  position: absolute;
  width: 75px;
  height: 75px;
  left: 87px;
  top: 95px;

  background: #ff9f0b;

  border-radius: 50%;
`

const Water = styled.div`
  position: absolute;
  width: 250px;
  height: 125px;
  left: 0px;
  top: 132px;

  background: #3634a3;
`
