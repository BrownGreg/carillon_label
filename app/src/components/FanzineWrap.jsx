import styled from 'styled-components'
import { colors, fonts } from '../theme'

export const FanzineWrap = styled.div`
  font-family: ${fonts.body};
  background: ${colors.paper};
  color: ${colors.ink};
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.4;
    background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px);
    background-size: 3px 3px;
    mix-blend-mode: multiply;
    z-index: 0;
  }
`

export const Strip = styled.div`
  background: ${colors.ink};
  color: ${colors.paper};
  padding: 6px 16px;
  display: flex;
  justify-content: space-between;
  font-family: ${fonts.body};
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
`

export const PageLabel = styled.div`
  background: ${colors.red};
  padding: 8px 16px;
  font-family: ${fonts.heading};
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 3px;
  color: ${colors.paper};
  text-transform: uppercase;
`

export const RedDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  background: ${colors.ink};
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
`
