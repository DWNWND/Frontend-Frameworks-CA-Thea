import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./Contact.module.css";
import ContactForm from "../../components/ContactForm";

export default function Contact() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Contact us | Lazz</title>
      </Helmet>
      <main className={styles.wrapper}>
        <h1 className={styles.pageTitle}>Contact us</h1>
        <ContactForm />
      </main>
    </HelmetProvider>
  );
}