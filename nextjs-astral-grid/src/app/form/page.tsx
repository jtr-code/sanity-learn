"use client"

import React, { useState } from "react";
import { sendFormToSanity } from "@/sanity/client";
import styles from "./form.module.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "",
    message: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (file) {
      await sendFormToSanity(formData, file);
      alert("Form submitted successfully!");
    } else {
      alert("Please upload a CV.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>APPLY HERE</h1>
      <form onSubmit={handleSubmit} className={styles.applicationForm}>
        <div className={styles.formRow}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            className={`${styles.formInput} ${styles.positionSelect}`}
          >
            <option value="">Position</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              id="cv-upload"
              className={styles.fileInput}
            />
            <label htmlFor="cv-upload" className={styles.fileInputLabel}>
              Attach Your CV
              <span className={styles.downloadIcon}>↓</span>
            </label>
          </div>
        </div>
        <textarea
          name="message"
          placeholder="Why Do You Think, You Are The Right Fit?"
          value={formData.message}
          onChange={handleChange}
          required
          className={styles.formTextarea}
        ></textarea>
        <button type="submit" className={styles.submitButton}>
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Form;