import { FormEvent } from 'react'
import axios from 'axios'
import styles from './Form.module.css'

interface IntegrationInterface {
  integration: 'Salesforce' | 'HubSpot' | 'Zapier'
}

const Form = ({integration}: IntegrationInterface) => {
  if (!integration) {
    return (
      <div>
        Please select an integration
      </div>
    )
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await axios({
      method: 'POST',
      url: '/api/integrations',
      data: JSON.stringify({test: 'aaa'})
    })

    console.log('\n---------- LOGGING response ----------\n', response)
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Editing integration: {integration}</p>
      <div
        className={styles.field}
      >
        <label
          htmlFor='name'
          className={styles.label}
        >
          Name
        </label>

        <input
          type='text'
          id='name'
        />
      </div>

      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form
