declare module 'react-spotify-login' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Button: React.FC<{
    clientId: string
    redirectUri?: string
    scope?: string
    className?: string
    buttonText?: string
    onRequest?: () => void
    onSuccess?: (response: { access_token: string }) => void
    onFailure?: (response: Error) => void
  }>

  export default Button
}
