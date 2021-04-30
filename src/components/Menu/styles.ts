import Link from '@material-ui/core/Link'
import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  overflow: hidden;
  z-index: 1000;

  /* Override inline style */
  /* Desktop */
  @media (min-width: 60rem) {
    transform: none !important;
  }

  /* Mobile */
  @media (max-width: 60rem) {
    position: fixed;
    top: 56px;
    left: 0;

    width: 100%;
    height: calc(100vh - 56px);

    flex-direction: column;
    justify-content: center;

    &:after {
      content: '';

      width: 100%;
      height: 100vh;

      position: absolute;
      top: 0;
      left: 0;

      transition: all 0.2s ease;
      pointer-events: none;
      backdrop-filter: brightness(70%) saturate(70%) blur(20px);
      z-index: -1;
    }
  }
`

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;

  margin-bottom: 1rem;

  @media (min-width: 60rem) {
    flex-direction: row;
    flex: 1;
    margin-left: 1rem;
    padding-left: 1rem;
    margin-bottom: 0;
    border-left: 1px solid #ffffff70;
  }
`

export const Item = styled(Link)`
  margin-right: 1rem;

  @media (max-width: 60rem) {
    text-align: center;
    width: 100%;
    margin: 0.5rem 0;
  }
`
