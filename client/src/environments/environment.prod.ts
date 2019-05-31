import { sharedEnvironment } from './environment.shared'

export const environment = {
  ...sharedEnvironment,
  production: true,
  serverUrl: ` https://vehicles-app.herokuapp.com`
}
