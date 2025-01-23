// Profile.tsx
import type React from 'react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

// Custom Component
import Logo from './_partials/profile/Logo'
import { processImage } from '@uiHelpers/imageProcessor'
import { Button, Image, Box } from '@chakra-ui/react'
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadTrigger,
} from '@uiChakra/file-upload'
import { ArrowUpFromLine } from 'lucide-react'
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

import { SectionHeader } from '@uiSharedComponents/SectionHeader'

const { ipcRenderer: ipc } = window.electronAPI
const Hint = styled.p`
  margin: -15px 0 20px 0;
  font-size: 80%;
  color: grey;
`

// Define the shape of the profile data
export interface ProfileData {
  logo: string
  fullname: string
  company: string
  address: string
  email: string
  phone: string
  website: string
}

// Define the props for the component
interface ProfileProps {
  profile: ProfileData
  updateSettings: (section: string, data: ProfileData) => void
}

const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml']
const Profile: React.FC<ProfileProps> = ({
  profile: initialProfile,
  updateSettings,
}) => {
  const [profile, setProfile] = useState<ProfileData>(initialProfile)
  const [base64, setBase64] = useState<string | null>(null)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newProfile = { ...profile, [name]: value }
    setProfile(newProfile)
    updateSettings('profile', newProfile)
  }

  const handleLogoChange = (base64String: string) => {
    const newProfile = { ...profile, logo: base64String }
    setProfile(newProfile)
    updateSettings('profile', newProfile)
  }

  const handleUpload = async () => {
    const base64Data = await ipc.invoke('open-file-dialog')
    if (base64Data) {
      setBase64(base64Data)
    }
  }

  return (
    <div>
      <div className="pageItem">
        <SectionHeader title="Your Logo" description="Upload your logo" />
        {base64 && <Image src={base64} alt="Logo" />}

        <Box>
          <Button onClick={handleUpload}>Select Image</Button>
        </Box>
      </div>

      <div className="row">
        <div className="pageItem col-md-6">
          <label className="itemLabel">Full Name</label>
          <input
            name="fullname"
            type="text"
            value={profile.fullname}
            onChange={handleInputChange}
          />
        </div>

        <div className="pageItem col-md-6">
          <label className="itemLabel">Company</label>
          <input
            name="company"
            type="text"
            value={profile.company}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="pageItem col-md-6">
          <label className="itemLabel">Address</label>
          <input
            name="address"
            type="text"
            value={profile.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="pageItem col-md-6">
          <label className="itemLabel">Email</label>
          <input
            name="email"
            type="text"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="pageItem col-md-6">
          <label className="itemLabel">Phone</label>
          <input
            name="phone"
            type="text"
            value={profile.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="pageItem col-md-6">
          <label className="itemLabel">Website</label>
          <input
            name="website"
            type="text"
            value={profile.website}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}

export default _withFadeInAnimation(Profile)
