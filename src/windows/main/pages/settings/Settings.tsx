// Libs
import type React from 'react'
import { useState } from 'react'
import { isEqual } from 'lodash'
import { useTranslation } from 'react-i18next'
import { create } from 'zustand'

// Components
import Profile from './components/Profile'
import General from './components/General'
import Invoice from './components/Invoice'
import { Button } from '@uiSharedComponents/Button'
import { Tab, Tabs, TabContent } from '@uiSharedComponents/Tabs'
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageContent,
} from '@uiSharedComponents/Layout'
import _withFadeInAnimation from '@uiSharedComponents/hoc/_withFadeInAnimation'

import { useSettingsStore } from '@uiMainStore/settingsStore'

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const [visibleTab, setVisibleTab] = useState<number>(1)
  const [canSave, setCanSave] = useState<boolean>(true)

  const { currentSettings, savedSettings, updateSettings, saveSettings } =
    useSettingsStore()

  const settingsSaved = (): boolean => {
    return isEqual(currentSettings, savedSettings)
  }

  const changeTab = (tabNum: number): void => {
    setVisibleTab(tabNum)
  }

  const setSavable = (settingsValid: boolean): void => {
    setCanSave(settingsValid)
  }

  const renderSettingsContent = (): JSX.Element => {
    const { profile, general, invoice } = currentSettings

    return (
      <PageWrapper>
        <PageHeader>
          <PageHeaderTitle>{t('settings:header')}</PageHeaderTitle>
          {!settingsSaved() && canSave && (
            <PageHeaderActions>
              <Button primary onClick={saveSettings}>
                {t('common:save')}
              </Button>
            </PageHeaderActions>
          )}
        </PageHeader>
        <PageContent>
          <Tabs>
            <Tab
              href="#"
              className={visibleTab === 1 ? 'active' : ''}
              onClick={() => changeTab(1)}
            >
              {t('settings:tabs:profile')}
            </Tab>
            <Tab
              href="#"
              className={visibleTab === 2 ? 'active' : ''}
              onClick={() => changeTab(2)}
            >
              {t('settings:tabs:invoice')}
            </Tab>
            <Tab
              href="#"
              className={visibleTab === 3 ? 'active' : ''}
              onClick={() => changeTab(3)}
            >
              {t('settings:tabs:general')}
            </Tab>
          </Tabs>
          <TabContent>
            {visibleTab === 1 && (
              <Profile
                t={t}
                profile={profile}
                updateSettings={updateSettings}
                setSavable={setSavable}
              />
            )}
            {visibleTab === 2 && (
              <Invoice
                t={t}
                invoice={invoice}
                updateSettings={updateSettings}
                setSavable={setSavable}
              />
            )}
            {visibleTab === 3 && (
              <General
                t={t}
                general={general}
                updateSettings={updateSettings}
                setSavable={setSavable}
              />
            )}
          </TabContent>
        </PageContent>
      </PageWrapper>
    )
  }

  return currentSettings ? renderSettingsContent() : null
}

export default _withFadeInAnimation(Settings)
