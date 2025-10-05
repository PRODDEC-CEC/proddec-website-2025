import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiUpload, FiCheck, FiBookOpen } from 'react-icons/fi';
import styles from './Form.module.css';

interface FormData {
  name: string;
  email: string;
  whatsappNumber: string;
  semester: string;
  paymentScreenshot: File | null;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    whatsappNumber: '',
    semester: '',
    paymentScreenshot: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special validation for WhatsApp number - only allow digits and limit to 10
    if (name === 'whatsappNumber') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 10 digits
      const limitedDigits = digitsOnly.slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: limitedDigits
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        paymentScreenshot: file
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          paymentScreenshot: file
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isFormValid = formData.name && formData.email && formData.whatsappNumber && 
                     formData.whatsappNumber.length === 10 && formData.semester && formData.paymentScreenshot;

  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <motion.div 
          className={styles.successCard}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className={styles.successIcon}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <FiCheck />
          </motion.div>
          <h2>Registration Successful!</h2>
          <p>Thank you for joining PRODDEC. We'll review your payment and get back to you within 24 hours.</p>
          <motion.button 
            className={styles.returnButton}
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Membership
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.formWrapper}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.header}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join PRODDEC
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Complete your membership registration
          </motion.p>
        </div>

        <motion.form 
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className={styles.formGrid}>
            {/* Name Field */}
            <motion.div 
              className={styles.inputGroup}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label className={styles.label}>
                <FiUser className={styles.labelIcon} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter your full name"
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div 
              className={styles.inputGroup}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label className={styles.label}>
                <FiMail className={styles.labelIcon} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="your.email@example.com"
                required
              />
            </motion.div>

            {/* WhatsApp Number Field */}
            <motion.div 
              className={styles.inputGroup}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label className={styles.label}>
                <FiPhone className={styles.labelIcon} />
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="9876543210"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Please enter exactly 10 digits"
                required
              />
            </motion.div>

            {/* Semester Field */}
            <motion.div 
              className={styles.inputGroup}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <label className={styles.label}>
                <FiBookOpen className={styles.labelIcon} />
                Current Semester
              </label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Select your semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
            </motion.div>
          </div>

          {/* File Upload Section */}
          <motion.div 
            className={styles.uploadSection}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label className={styles.label}>
              <FiUpload className={styles.labelIcon} />
              Payment Screenshot
            </label>
            <div 
              className={`${styles.uploadArea} ${dragActive ? styles.dragActive : ''} ${formData.paymentScreenshot ? styles.hasFile : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className={styles.fileInput}
                id="file-upload"
                required
              />
              <label htmlFor="file-upload" className={styles.uploadLabel}>
                {formData.paymentScreenshot ? (
                  <div className={styles.fileInfo}>
                    <FiCheck className={styles.uploadIcon} />
                    <span className={styles.fileName}>{formData.paymentScreenshot.name}</span>
                    <span className={styles.fileSize}>
                      {(formData.paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ) : (
                  <div className={styles.uploadPrompt}>
                    <FiUpload className={styles.uploadIcon} />
                    <span className={styles.uploadText}>
                      Drop your payment screenshot here or click to browse
                    </span>
                    <span className={styles.uploadHint}>
                      Supports: JPG, PNG, GIF (Max 10MB)
                    </span>
                  </div>
                )}
              </label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`${styles.submitButton} ${!isFormValid ? styles.disabled : ''}`}
            disabled={!isFormValid || isSubmitting}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            transition={{ duration: 0.2 }}
          >
            {isSubmitting ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                Processing...
              </div>
            ) : (
              'Complete Registration'
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Form;
