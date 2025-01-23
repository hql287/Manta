// Libraries
import type React from 'react'
import type { ChangeEvent, FC } from 'react'
import { useState, useEffect } from 'react'

// Custom Libs
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

// Types
interface GeneralProps {
  general: {
    sound: string
    muted: boolean
    language: string
    previewPDF: boolean
  }
  updateSettings: (category: string, settings: any) => void
}

const General: FC<GeneralProps> = ({ general, updateSettings }) => {
  const [settings, setSettings] = useState(general)

  useEffect(() => {
    setSettings(general)
  }, [general])

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = event.target
    const newValue = type === 'checkbox' ? checked : value

    setSettings((prevSettings) => {
      const updatedSettings = { ...prevSettings, [name]: newValue }
      updateSettings('general', updatedSettings)
      return updatedSettings
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="pageItem">
            <label className="itemLabel">Sound</label>
            <select
              name="sound"
              value={settings.sound}
              onChange={handleInputChange}
            >
              <option value="default">Default</option>
              <option value="cs">Counter Strike</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="pageItem">
            <label className="itemLabel">Mute</label>
            <label className="switch">
              <input
                name="muted"
                type="checkbox"
                checked={settings.muted}
                onChange={handleInputChange}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="pageItem">
            <label className="itemLabel">Language</label>
            <select
              name="language"
              value={settings.language}
              onChange={handleInputChange}
            >
              <option value="de">German</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="id">Indonesian</option>
              <option value="it">Italian</option>
              <option value="sk">Slovak</option>
              <option value="ur-PK">Urdu (Pakistan)</option>
              <option value="vi">Vietnamese</option>
              <option value="zh-CN">Chinese (Simplified)</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="pageItem">
            <label className="itemLabel">Open PDF Reader</label>
            <label className="switch">
              <input
                name="previewPDF"
                type="checkbox"
                checked={settings.previewPDF}
                onChange={handleInputChange}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default _withFadeInAnimation(General)
