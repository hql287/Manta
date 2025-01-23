// Libraries
import React, { useState, useEffect } from 'react'
import { Circle } from 'rc-progress'
import { Notify } from '@uiHelpers/notify.js'
import styled, { keyframes } from 'styled-components'

// Destructure exposed APIs from preload script
const { ipcRenderer: ipc, createDialogWindow } = window.electronAPI

// Styled Components
const breathing = keyframes`
  0% { opacity: 0.5; }
  100% { opacity: 1; }
`

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  color: #f2f3f4;

  i {
    font-size: 24px;
    animation: ${breathing} 1s infinite alternate;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`

// Props and State Type Definitions
interface AppUpdateProps {}

const AppUpdate: React.FC<AppUpdateProps> = () => {
  const [checking, setChecking] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)

  const hideIndicator = () => {
    setChecking(false)
    setDownloading(false)
    setProgress(null)
  }

  const handleUpdateAvailable = async () => {
    hideIndicator()
    try {
      await createDialogWindow(
        {
          type: 'info',
          title: 'Update Available',
          message:
            'A new version of the app is available. Do you want to download it?',
          buttons: ['Yes', 'No'],
        },
        'update-download-confirmed'
      )
    } catch (error) {
      console.error('Error creating dialog window:', error)
    }
  }

  const handleUpdateNotAvailable = async () => {
    hideIndicator()
    try {
      await createDialogWindow({
        type: 'info',
        title: 'No Updates Available',
        message: 'You are already running the latest version of the app.',
      })
    } catch (error) {
      console.error('Error creating dialog window:', error)
    }
  }

  const handleUpdateChecking = () => setChecking(true)

  const handleUpdateError = async (event: any, error: string) => {
    hideIndicator()
    try {
      await createDialogWindow({
        type: 'warning',
        title: 'Update Error',
        message: error,
      })
    } catch (dialogError) {
      console.error('Error creating dialog window:', dialogError)
    }
  }

  const handleDownloadConfirmed = (event: any, index: number) => {
    if (index === 1) {
      hideIndicator()
      return
    }
    if (index === 0) {
      setDownloading(true)
      ipc.send('update-download-started')
    }
  }

  const handleDownloadProgress = (event: any, percentage: number) => {
    setProgress(percentage)
  }

  const handleUpdateDownloaded = async () => {
    Notify({
      title: 'Update Downloaded',
      body: 'The update has been downloaded successfully.',
    })

    try {
      await createDialogWindow(
        {
          type: 'info',
          title: 'Update Ready to Install',
          message:
            'The update has been downloaded. Would you like to install it now?',
          buttons: ['Quit and Install', 'Later'],
        },
        'upgrade-confirmed'
      )
    } catch (error) {
      console.error('Error creating dialog window:', error)
    }
    hideIndicator()
  }

  const handleUpgradeConfirmed = (event: any, index: number) => {
    if (index === 0) {
      ipc.send('quit-and-install')
    }
  }

  useEffect(() => {
    // Register IPC event listeners
    ipc.on('update-checking', handleUpdateChecking)
    ipc.on('update-available', handleUpdateAvailable)
    ipc.on('update-not-available', handleUpdateNotAvailable)
    ipc.on('update-error', handleUpdateError)
    ipc.on('update-download-confirmed', handleDownloadConfirmed)
    ipc.on('update-download-progress', handleDownloadProgress)
    ipc.on('update-downloaded', handleUpdateDownloaded)
    ipc.on('upgrade-confirmed', handleUpgradeConfirmed)

    // Cleanup listeners on component unmount
    return () => {
      ipc.removeAllListeners([
        'update-checking',
        'update-available',
        'update-not-available',
        'update-error',
        'update-download-confirmed',
        'update-download-progress',
        'update-downloaded',
        'upgrade-confirmed',
      ])
    }
  }, [])

  return (
    <Indicator>
      {checking && <i className="ion-cloud" />}
      {downloading && progress !== null && (
        <Circle
          percent={progress}
          strokeWidth={16}
          trailWidth={16}
          trailColor="#4F555C"
          strokeColor="#469FE5"
        />
      )}
    </Indicator>
  )
}

export default AppUpdate
