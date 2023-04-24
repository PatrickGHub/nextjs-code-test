import { FormEvent, useState } from 'react'
import axios from 'axios'
import styles from './Form.module.css'

interface IntegrationInterface {
  integrationData: {
    connected: Boolean
    formFields: Object
  }
  integration: 'Salesforce' | 'HubSpot' | 'Zapier'
}

const Form = ({integrationData, integration}: IntegrationInterface) => {
  if (!integration) {
    return (
      <div>
        Please select an integration
      </div>
    )
  }

  const [formData, setFormData] = useState(integrationData.formFields)

  const handleChange = (e: FormEvent) => {
    setFormData({
      ...formData,
      [e.target.id]: {
        ...formData[e.target.id],
        value: e.target.value
      }
    })
  }

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    await axios({
      method: 'POST',
      url: `/api/integrations/${integration}/connect`,
      data: formData
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Adding integration for {integration}</p>

      {
        Object.keys(integrationData.formFields).map((formField) => {
          return (
            <div
              key={formField}
              className={styles.field}
            >
              <label
                htmlFor={integrationData.formFields[formField].key}
                className={styles.label}
              >
                {integrationData.formFields[formField].readableKey}
              </label>

              <input
                type={integrationData.formFields[formField].fieldType}
                id={integrationData.formFields[formField].key}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )
        })
      }

      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form
