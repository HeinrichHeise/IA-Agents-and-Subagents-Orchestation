// LanguageSelector.js - Seletor compacto e elegante de idiomas (PT-BR, EN-US, DE)
import React from 'https://esm.sh/react@18';
import { supportedLanguages } from '../data/i18nData.js';

export function LanguageSelector({ currentLang, onSelectLang }) {
  return React.createElement(
    'div',
    {
      className: 'lang-selector-group',
      role: 'group',
      'aria-label': 'Seleção de Idioma / Language Selection'
    },
    supportedLanguages.map((lang) => {
      const isActive = lang.code === currentLang;
      return React.createElement(
        'button',
        {
          key: lang.code,
          type: 'button',
          className: `lang-btn ${isActive ? 'active' : ''}`,
          onClick: () => onSelectLang(lang.code),
          'aria-pressed': isActive,
          title: lang.name
        },
        React.createElement('span', { className: 'lang-flag' }, lang.flag),
        React.createElement('span', { className: 'lang-code' }, lang.label)
      );
    })
  );
}
