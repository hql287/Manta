// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { Section, Label } from '../shared';

function Language({ t, language, handleInputChange, UILang }) {
  return (
    <Section>
      <Label>
        {t('settings:fields:language:name', { lng: UILang })}
      </Label>
      <select name="language" value={language} onChange={handleInputChange}>
        <option value="de">{t('settings:fields:language:de', { lng: 'de' })}</option>
        <option value="en">{t('settings:fields:language:en', { lng: 'en' })}</option>
        <option value="fr">{t('settings:fields:language:fr', { lng: 'fr' })}</option>
        <option value="id">{t('settings:fields:language:id', { lng: 'id' })}</option>
        <option value="it">{t('settings:fields:language:it', { lng: 'it' })}</option>
        <option value="sk">{t('settings:fields:language:sk', { lng: 'sk' })}</option>
        <option value="ur-PK">{t('settings:fields:language:ur-PK', { lng: 'ur-PK' })}</option>
        <option value="vi">{t('settings:fields:language:vi', { lng: 'vi' })}</option>
        <option value="zh-CN">{t('settings:fields:language:zh-CN', { lng: 'zh-CN' })}</option>
      </select>
    </Section>
  );
}

Language.propTypes = {
  language: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  UILang: PropTypes.string.isRequired,
};

export default Language;
