// Footer.js - Rodapé de Atribuição e Disclaimer Legal de Direitos Autorais
import React from 'https://esm.sh/react@18';
import { videoMetadata } from '../data/videoFlowData.js';
import { i18n } from '../data/i18nData.js';

export function Footer({ paradigm = 'orchestrated', lang = 'pt' }) {
  const t = i18n[lang]?.footer || i18n.pt.footer;
  const isTraditional = paradigm === 'traditional';

  return React.createElement(
    'footer',
    { className: `app-legal-footer ${isTraditional ? 'footer-traditional' : ''}` },
    React.createElement(
      'div',
      { className: 'footer-content-wrapper' },
      // Linha 1: Badges de Propriedade Intelectual e Base Legal
      React.createElement(
        'div',
        { className: 'footer-badges-row' },
        React.createElement(
          'span',
          { className: `footer-badge ${isTraditional ? 'yt-footer-badge primary' : 'primary'}` },
          t.badgeEdu
        ),
        React.createElement(
          'span',
          { className: `footer-badge ${isTraditional ? 'yt-footer-badge' : ''}` },
          t.badgeLaw
        ),
        React.createElement(
          'span',
          { className: `footer-badge ${isTraditional ? 'yt-footer-badge' : ''}` },
          t.badgeFairUse
        ),
        React.createElement(
          'span',
          { className: `footer-badge ${isTraditional ? 'yt-footer-badge author' : 'author'}` },
          t.badgeAuthor
        )
      ),
      // Linha 2: Atribuição Obrigatória a Kauã Miguel
      React.createElement(
        'p',
        { className: 'footer-attribution-text' },
        t.originalRefPrefix,
        React.createElement(
          'strong',
          { style: { color: isTraditional ? '#111111' : '#f8fafc' } },
          `"${videoMetadata.title}"`
        ),
        t.publishedBy,
        React.createElement(
          'a',
          {
            href: videoMetadata.videoUrl,
            target: '_blank',
            rel: 'noreferrer',
            className: `footer-author-link ${isTraditional ? 'yt-author-link' : ''}`
          },
          t.channelLink
        ),
        t.rightsNotice
      ),
      // Linha 3: Disclaimer de Isenção e Propósito Acadêmico
      React.createElement(
        'p',
        { className: `footer-disclaimer-text ${isTraditional ? 'yt-disclaimer' : ''}` },
        t.disclaimer
      )
    )
  );
}
