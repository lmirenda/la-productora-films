import Script from 'next/script'
import React from 'react'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="force-dark"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        // Immediately force dark, no checks
        document.documentElement.setAttribute('data-theme', 'dark');
      `,
      }}
    />
  )
}
