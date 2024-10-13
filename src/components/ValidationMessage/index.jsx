import styles from "./ValidationMessage.module.css";

export function ValidationMessage({ errorMessage }) {
  return <p className={styles.validationMessage}>{errorMessage}</p>;
}
