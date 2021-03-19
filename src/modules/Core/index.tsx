import { ReactNode } from 'react'

type Prop = { children: ReactNode }

const Core = ({ children }: Prop) => {
  // const dependencies = useContext(DependenciesContext)

  return <>{children}</>
}

export default Core
