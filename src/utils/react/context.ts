import * as React from "react";

export interface CreateContextOptions {
  /**
   * The display name of the context
   */
  name: string;
  /**
   * Error message to throw if the context is `undefined`
   */
  errorMessage?: string;
  /**
   * If `true`, React will throw if context is `null` or `undefined`
   * In some cases, you might want to support nested context, so you can set it to `false`
   */
  strict?: boolean;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

/**
 * Creates a named context, hook and provider.
 *
 * @param options create context options
 */
export function createContext<ContextType>(
  options: CreateContextOptions
): CreateContextReturn<Partial<ContextType>> {
  const { strict = true, errorMessage, name } = options;

  const Context = React.createContext<Partial<ContextType>>({});

  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);

    if (!context && strict) {
      throw new Error(
        errorMessage ||
          `useContext: ${name} is undefined. Seems you forgot to wrap component within the Provider`
      );
    }

    return context;
  }

  return [Context.Provider, useContext, Context];
}
