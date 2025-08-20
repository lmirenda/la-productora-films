declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
    }
  }

  interface Window {
    visualViewport?: {
      height: number
      width: number
      addEventListener(type: 'resize', listener: () => void): void
      removeEventListener(type: 'resize', listener: () => void): void
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
