import { FormEvent, useState } from 'react'
import axios from 'axios'
import styles from './Form.module.css'
import { EnabledIntegrations, SingleIntegrationData } from '../../types/types'

interface FormInterface {
  integrationData: SingleIntegrationData
  integration: EnabledIntegrations
}

const Form = ({integrationData, integration}: FormInterface) => {
  if (!integration) {
    return (
      <div>
        Please select an integration
      </div>
    )
  }

  const [formData, setFormData] = useState(integrationData.formFields)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: {
        ...formData[e.currentTarget.id],
        value: e.currentTarget.value
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
