export type EnabledIntegrations = 'Salesforce' | 'HubSpot' | 'Zapier'

export interface SingleIntegrationData {
  connected: Boolean
  formFields: {
    [key: string]: {
      readableKey: string
      key: string
      fieldType: string
      value: string
    }
  }
}

export interface IntegrationsData {
  [key: string]: SingleIntegrationData
}