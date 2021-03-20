import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { CHART_ID } from 'common/constants'
import { Screenshot } from 'services/screenshot'

const scrollToAsync = (x = 0, y = 0) =>
  new Promise<void>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-extra-semi, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ;(global as any).window.scrollTo(x, y)

    setTimeout(() => {
      resolve()
    }, 100)
  })

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)',
      justifyContent: 'center',
    },
    container: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      boxSizing: 'border-box',
      textAlign: 'center',
      justifyContent: 'center',
    },
    grid: {
      textAlign: 'center',
      padding: '12px',
      flexGrow: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    image: {
      maxHeight: '700px',
      maxWidth: '700px',
      borderRadius: '5px',
      width: '100%',
      boxShadow: theme.shadows[5],
    },
  })
)

const ChartDisplay = () => {
  const [bgPosition, setBgPosition] = useState(0)
  const [button, setButton] = useState<HTMLButtonElement>()
  const [container, setContainer] = useState<HTMLDivElement>()
  const [image, setImage] = useState('')
  const classes = useStyles({ bgPosition })
  const router = useRouter()

  const getImage = async () => {
    const node = document.getElementById(CHART_ID)
    if (!node) return
    const screenshot = new Screenshot({ node })
    return screenshot.getImage()
  }

  const downloadImage = () => {
    const a = document.createElement('a')
    a.href = image
    a.setAttribute('download', `toplast_${new Date().getTime()}.jpg`)
    a.click()
  }

  useEffect(() => {
    const getImageUrl = async () => {
      await scrollToAsync()
      const imageUrl = await getImage()
      if (imageUrl) setImage(imageUrl)
    }

    // eslint-disable-next-line no-console
    getImageUrl().catch((err) => console.error(err))
  })

  useEffect(() => {
    if (button && container) {
      const buttonRect = button.getBoundingClientRect()
      const containerRec = container.getBoundingClientRect()

      setBgPosition(
        ((buttonRect.top + buttonRect.height / 2 - containerRec.top) /
          containerRec.height) *
          100
      )
    }
  }, [button, container, image])

  return (
    <div
      className={classes.background}
      ref={(element) => {
        if (element) setContainer(element)
      }}
      style={{
        background: `linear-gradient(180deg, rgba(247,229,229,1) ${bgPosition}%, rgba(255,255,255,0) ${bgPosition}%)`,
      }}
    >
      <div className={classes.container}>
        {image && (
          <div className={classes.grid}>
            <img src={image} alt="chart" className={classes.image} />
          </div>
        )}
        <div className={classes.grid}>
          <Button
            ref={(element) => {
              if (element) setButton(element)
            }}
            color="primary"
            variant="contained"
            onClick={downloadImage}
          >
            Download image
          </Button>

          <Button onClick={() => router.push('/')} style={{ marginTop: '8px' }}>
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChartDisplay
