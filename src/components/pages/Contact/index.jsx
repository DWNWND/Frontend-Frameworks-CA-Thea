import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Contact.module.css";
import ValidationMessage from "../../ValidationMessage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "../../Button";
import checkIfMobileScreen from "../../../checkIfMobileScreen";
import { Helmet, HelmetProvider } from "react-helmet-async";

const schema = yup
  .object({
    fullName: yup.string().min(3, "Your name must be minimum 3 characters.").required("Please enter your full name"),
    subject: yup.string().min(3, "Your subject must be more than 3 characters").required("Please enter a subject"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    body: yup.string().min(3, "Your message must be more than 3 characters").required("Please enter a message"),
  })
  .required();

export default function Contact() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Contact us | Lazz</title>
      </Helmet>
      <div className={styles.wrapper}>
        <h1 className={styles.pageTitle}>Contact us</h1>
        <ContactForm />
      </div>
    </HelmetProvider>
  );
}

function ContactForm() {
  const isMobile = checkIfMobileScreen();
  const location = useLocation();
  const page = location.pathname;

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      alert("Thank you. Your inquiry was sent!");
      reset();
    }
  }, [formState, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
        <div className={styles.inputContainer}>
          <label className={styles.inputLabelForText} htmlFor="fullName">
            Full name *
          </label>
          <input id="fullName" className={errors.fullName ? styles.error : styles.valid} {...register("fullName")} />
          <ValidationMessage errorMessage={errors.fullName?.message}></ValidationMessage>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabelForText} htmlFor="email">
            Email *
          </label>
          <input autoComplete="email" id="email" className={errors.email ? styles.error : styles.valid} {...register("email")} />
          <ValidationMessage errorMessage={errors.email?.message}></ValidationMessage>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabelForText} htmlFor="subject">
            Subject *
          </label>
          <input id="subject" className={errors.subject ? styles.error : styles.valid} {...register("subject")} />
          <ValidationMessage errorMessage={errors.subject?.message}></ValidationMessage>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.inputLabelForText} htmlFor="body">
            Message *
          </label>
          <input id="body" className={`${errors.body ? styles.error : styles.valid} ${styles.message}`} {...register("body")} />
          <ValidationMessage errorMessage={errors.body?.message}></ValidationMessage>
        </div>
        <div>
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms" className={styles.inputLabelForCheckbox}>
            I want updates on new offers.
          </label>
        </div>
      </form>
      <p className={styles.required}>Required fields are marked with *</p>
      {isMobile ? null : <Button page={page} />}
    </>
  );
}
