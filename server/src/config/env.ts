import 'dotenv/config'

export const { env: { NODE_ENV, EXPRESS_SESSION_SECRET, DATABASE_URL, PORT } } = process as any as   {
  env: {
    NODE_ENV: 'production',
    EXPRESS_SESSION_SECRET: string,
    DATABASE_URL: string,
    PORT: number
  }
}