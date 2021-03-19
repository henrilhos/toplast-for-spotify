import { Palette } from 'node-vibrant/lib/color'

import * as S from './styles'
import { getDescriptionByType } from 'services/chart'
import { GetUserTopArtistsOrTracks } from 'services/spotify'

type Props = { data: GetUserTopArtistsOrTracks; palette?: Palette }

const ChartFooter = ({ data, palette }: Props) => {
  const textColor = palette?.LightMuted?.titleTextColor
  const backgroundColor = palette?.LightMuted?.hex

  return (
    <S.Wrapper backgroundColor={backgroundColor} color={textColor}>
      <S.Container>
        <S.Image src={data.image} />

        <S.Content>
          <S.Description>{getDescriptionByType(data.type)}</S.Description>
          <S.Title>{data.title}</S.Title>
          {data.description && <S.Subtitle>{data.description}</S.Subtitle>}
        </S.Content>
      </S.Container>

      <S.Container>
        <S.Content>
          <S.Title>spotify.toplast.net</S.Title>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  )
}

export default ChartFooter
