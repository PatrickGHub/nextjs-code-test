import styles from './fieldMappingForm.module.css'

interface FieldMappingFormInterface {
  fields: {
    [key: string]: string
  }
  handleMappingChange: Function
}

const FieldMappingForm = ({fields, handleMappingChange}: FieldMappingFormInterface) => {
  return (
    <div>
      {
        Object.keys(fields).map((mapping) => {
          return (
            <div
              key={mapping}
              className={styles.field}
            >
              <label
                htmlFor={mapping}
                className={styles.label}
              >
                {mapping}
              </label>

              <input
                type='text'
                id={mapping}
                onChange={(e) => handleMappingChange(e)}
                required
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default FieldMappingForm