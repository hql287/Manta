// Libraries
import type React from 'react'
import { useState, useEffect } from 'react'
import { processImg } from '@uiHelpers/image'

const { ipcRenderer: ipc } = window.electronAPI

// Styles
import styled from 'styled-components'

const LogoContainer = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoDisplayzone = styled.div`
  max-width: 160px;
  max-height: 160px;
  display: flex;
  img {
    max-width: 180px;
    width: 100%;
    height: auto;
  }
`

const RemoveLogoBtn = styled.a`
  position: absolute;
  top: -15px;
  right: -15px;
  font-size: 32px;
  color: red;
  line-height: 32px;
  i {
    color: #ec476e;
  }
  &:hover {
    cursor: pointer;
  }
`

const SelectLogoBtn = styled.a`
  position: absolute;
  bottom: 20px;
  width: 80%;
  background: #469fe5;
  border-radius: 4px;
  padding: 4px 8px;
  text-align: center;
  color: white !important;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  &:hover {
    cursor: pointer;
  }
`

interface LogoProps {
  handleLogoChange: (logo: string | null) => void
  logo?: string | null
}

const Logo: React.FC<LogoProps> = ({ handleLogoChange, logo }) => {
  //useEffect(() => {
  //const fileSelectedHandler = (
  ////event: Electron.IpcRendererEvent,
  //filePath: string
  //) => {
  //handleFileUpload(filePath)
  //}

  //ipc.on('file-selected', fileSelectedHandler)

  //return () => {
  //ipc.removeListener('file-selected', fileSelectedHandler)
  //}
  //}, [])

  //const handleFileUpload = (filePath: string): void => {
  //processImg(filePath, (imgSrcString) => {
  //handleLogoChange(imgSrcString)
  //})
  //}

  //const selectLogo = (): void => {
  //ipc.send('open-file-dialog')
  //}

  const [base64, setBase64] = useState<string | null>(null) // Base64 string of the logo

  const handleUpload = async () => {
    const base64Data = await ipc.invoke('open-file-dialog')
    if (base64Data) {
      setBase64(base64Data)
      console.log(base64)
    }
  }

  const removeLogo = (): void => {
    handleLogoChange(null)
  }

  return (
    <LogoContainer>
      {logo ? (
        <LogoDisplayzone>
          <img src={logo} alt="Logo" />
          <RemoveLogoBtn onClick={removeLogo}>
            <i className="ion-android-cancel" />
          </RemoveLogoBtn>
        </LogoDisplayzone>
      ) : (
        <>
          <div>
            <p>Drag and drop is no longer available. Please select a logo.</p>
          </div>
          <SelectLogoBtn onClick={handleUpload}>Select Photo</SelectLogoBtn>
        </>
      )}
    </LogoContainer>
  )
}

export default Logo
