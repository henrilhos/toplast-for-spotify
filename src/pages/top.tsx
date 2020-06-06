import React from 'react'
// import styled from 'styled-components'

// import { Container as BaseContainer } from 'common/UI'
import Chart from 'modules/Chart'
import Core from 'modules/Core'
// import Header from 'modules/Header'

// const Container = styled(BaseContainer)`
//   display: flex;
//   flex-wrap: wrap;
//   flex: 1 1 auto;

//   padding: 1rem;
// `

const Top: React.FC = () => {
  return (
    <Core>
      {/* <Header /> */}

      {/* <Container> */}
      <Chart />
      {/* </Container> */}
    </Core>
  )
}

export default Top
