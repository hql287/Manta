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
        <option value="en">{t('settings:fields:language:en', { lng: UILang })}</option>
        <option value="ko">{t('settings:fields:language:ko', { lng: UILang })}</option>
        <option value="vi">{t('settings:fields:language:vi', { lng: UILang })}</option>
        <option value="zh-CN">{t('settings:fields:language:zh-CN', { lng: UILang })}</option>
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
