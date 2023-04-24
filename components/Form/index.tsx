import { FormEvent, useState } from 'react'
import axios from 'axios'
import styles from './Form.module.css'
import { EnabledIntegrations, SingleIntegrationData } from '@/types'
import { FieldMappingForm } from '@/components'

interface FormInterface {
  integrationData: SingleIntegrationData
  integration: EnabledIntegrations
  setSelectedIntegration: Function
  handleDataRefresh: Function
}

const Form = ({integrationData, integration, setSelectedIntegration, handleDataRefresh}: FormInterface) => {
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
      data: {
        formData,
        integration
      }
    })

    await handleDataRefresh()
    return setSelectedIntegration(null)
  }

  const handleMappingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      field_mappings: {
        ...formData.field_mappings,
        fields: {
          ...formData.field_mappings.fields,
          [e.target.id]: e.target.value
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className={styles.p}>Adding integration for {integration}</p>

      {
        Object.keys(integrationData.formFields).map((formField) => {

          if (formField === 'field_mappings' && integrationData.formFields.field_mappings.fields) {
            return (
              <div key='field_mappings'>
                <p className={styles.p}>Map contact detail keys to new keys</p>

                <FieldMappingForm
                  fields={integrationData.formFields.field_mappings.fields}
                  handleMappingChange={handleMappingChange}
                />
              </div>
            )
          }

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
                required
              />
            </div>
          )
        })
      }

      <button type='submit' className={styles.submitButton}>Submit</button>
    </form>
  )
}

export default Form
