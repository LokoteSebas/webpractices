import { useState } from 'react'
import styles from './LoginPage.module.css'

function LoginPage({ onLogin }) {
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [showError, setShowError] = useState(false)

  const hasEmptyFields = !firstValue.trim() || !secondValue.trim()

  function handleSubmit(event) {
    event.preventDefault()

    if (hasEmptyFields) {
      setShowError(true)
      return
    }

    onLogin()
  }

  return (
    <main className={styles.loginPage}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1 className={styles.title}>Inicio de sesión</h1>

        <label className={styles.field}>
          <span>Campo uno</span>
          <input
            aria-invalid={showError && !firstValue.trim()}
            onChange={(event) => {
              setFirstValue(event.target.value)
              setShowError(false)
            }}
            placeholder="coloca cualquier cosa"
            type="text"
            value={firstValue}
          />
        </label>

        <label className={styles.field}>
          <span>Campo dos</span>
          <input
            aria-invalid={showError && !secondValue.trim()}
            onChange={(event) => {
              setSecondValue(event.target.value)
              setShowError(false)
            }}
            placeholder="coloca cualquier cosa"
            type="text"
            value={secondValue}
          />
        </label>

        {showError && (
          <p className={styles.error} role="alert">
            Llena ambos campos para continuar.
          </p>
        )}

        <button className={styles.button} type="submit">
          go to dashboard
        </button>
      </form>
    </main>
  )
}

export default LoginPage
