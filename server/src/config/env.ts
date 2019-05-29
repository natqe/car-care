import { config } from 'dotenv'

export const { parsed: { NODE_ENV, EXPRESS_SESSION_SECRET, DATABASE_URL, PORT } } = config() as any as   {
  parsed: {
    NODE_ENV: 'production',
    EXPRESS_SESSION_SECRET: string,
    DATABASE_URL: string,
    PORT: number
  }
}