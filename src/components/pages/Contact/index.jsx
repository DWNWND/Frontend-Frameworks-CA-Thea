import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Contact.module.css";
import ValidationMessage from "../../ValidationMessage";
import { useEffect } from "react";

const schema = yup
  .object({
    fullName: yup.string().min(3, "Your name must be minimum 3 characters.").required("Please enter your full name"),
    subject: yup.string().min(3, "Your subject must be more than 3 characters").required("Please enter a subject"),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    body: yup.string().min(3, "Your message must be more than 3 characters").required("Please enter a message"),
  })
  .required();

export default function Contact() {
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
    <div className={styles.wrapper}>
      <h1>Contact us</h1>
      <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
        <div className={styles.inputContainer}>
          <label htmlFor="fullName">Full name</label>
          <input className={errors.fullName ? styles.error : styles.valid} {...register("fullName")} />
          <ValidationMessage errorMessage={errors.fullName?.message}></ValidationMessage>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input className={errors.email ? styles.error : styles.valid} {...register("email")} />
          <ValidationMessage errorMessage={errors.email?.message}></ValidationMessage>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="subject">Subject</label>
          <input className={errors.subject ? styles.error : styles.valid} {...register("subject")} />
          <ValidationMessage errorMessage={errors.subject?.message}></ValidationMessage>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="body">Message</label>
          <input className={`${errors.body ? styles.error : styles.valid} ${styles.message}`} {...register("body")} />
          <ValidationMessage errorMessage={errors.body?.message}></ValidationMessage>
        </div>
      </form>
    </div>
  );
}
