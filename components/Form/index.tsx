import styles from "./Form.module.css"

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

  return (
    <form action="">
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
    </form>
  )
}

export default Form
