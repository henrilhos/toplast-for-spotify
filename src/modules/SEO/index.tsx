import Head from 'next/head'

import { APP_NAME, DESCRIPTION, URL } from 'common/constants'

const SEO = () => (
  <Head>
    <title>{APP_NAME}</title>
    <meta name="description" content={DESCRIPTION} />

    <meta property="og:url" content={URL} />
    <meta property="og:title" content={APP_NAME} />
    <meta property="og:description" content={DESCRIPTION} />

    <meta name="twitter:title" content={APP_NAME} />
    <meta name="twitter:description" content={DESCRIPTION} />
  </Head>
)

export default SEO
