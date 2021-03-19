import { createContext, ReactNode, useState } from 'react'

import { Screenshot } from 'services/screenshot'

const dependencies = {
  screenshot: Screenshot,
}

type InstanceOfDependencies = {
  screenshot: Screenshot
}

type DependenciesProps = typeof dependencies
type DependenciesKeys = keyof DependenciesProps

type DependenciesParameters = {
  [K in DependenciesKeys]: Unpacked<ConstructorParameters<DependenciesProps[K]>>
}

type InstanceDependencies = {
  [K in DependenciesKeys]: InstanceType<DependenciesProps[K]>
}

type State = {
  [K in keyof InstanceDependencies]?: InstanceDependencies[K]
}

type ReturnOfContext<R extends DependenciesKeys> =
  | InstanceOfDependencies[R]
  | false

type Props = { children: ReactNode }

interface ContextMethods {
  create: <S extends DependenciesKeys>(
    service: S,
    options?: DependenciesParameters[S]
  ) => ReturnOfContext<S>
  get: <S extends DependenciesKeys>(service: S) => ReturnOfContext<S>
  destroy: (service: DependenciesKeys) => boolean
  dependencies: State
}

const DependenciesContext = createContext<ContextMethods>({
  create: () => false,
  destroy: () => false,
  get: () => false,
  dependencies: {},
})

const DependenciesProvider = ({ children }: Props) => {
  const [initialized, setInitialized] = useState<State>({})

  const create: ContextMethods['create'] = <S extends DependenciesKeys>(
    name: S,
    options?: DependenciesParameters[S]
  ) => {
    const Dependency = dependencies[name]

    if (!Dependency) return false
    if (initialized[name]) return initialized[name] as InstanceDependencies[S]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instanceOfDependency = new Dependency(options as any)

    setInitialized((prev) => ({
      ...prev,
      [name]: instanceOfDependency,
    }))

    return instanceOfDependency as InstanceDependencies[S]
  }

  const destroy: ContextMethods['destroy'] = (name) => {
    if (!initialized[name]) return false

    setInitialized((prev) => {
      const newObj = prev
      delete newObj[name]

      return newObj
    })

    return true
  }

  const get: ContextMethods['get'] = <S extends DependenciesKeys>(
    service: S
  ) => {
    if (initialized[service])
      return initialized[service] as InstanceOfDependencies[S]
    return false
  }

  return (
    <DependenciesContext.Provider
      value={{ create, destroy, get, dependencies: initialized }}
    >
      {children}
    </DependenciesContext.Provider>
  )
}

export { DependenciesContext, DependenciesProvider }
