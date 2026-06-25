import styled from 'styled-components'
import { colors, fonts } from '../theme'

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${({ $mb }) => $mb ?? '20px'};
`

const Num = styled.div`
  background: ${({ $inverted }) => ($inverted ? colors.paper : colors.ink)};
  color: ${({ $inverted }) => ($inverted ? colors.ink : colors.paper)};
  padding: 4px 12px;
  font-family: ${fonts.display};
  font-size: 22px;
`

const Title = styled.div`
  font-family: ${fonts.display};
  font-size: 32px;
  letter-spacing: 1px;
  flex: 1;
`

const Rule = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ $inverted }) => ($inverted ? colors.paper : colors.ink)};
`

export default function SectionHeader({ num, title, inverted = false, mb }) {
  return (
    <Head $mb={mb}>
      {num && <Num $inverted={inverted}>{num}</Num>}
      <Title>{title}</Title>
      <Rule $inverted={inverted} />
    </Head>
  )
}
