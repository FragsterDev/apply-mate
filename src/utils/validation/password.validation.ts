// utils/validators/password.validator.ts

/**
 * Validates a password according to standard security requirements
 * @param password - The password to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Minimum length check
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  // Maximum length check (optional but recommended)
  if (password.length > 64) {
    errors.push("Password must be less than 64 characters");
  }

  // Uppercase letter check
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  // Lowercase letter check
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  // Digit check
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  // Special character check
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }

  // No whitespace check
  if (/\s/.test(password)) {
    errors.push("Password cannot contain whitespace");
  }

  // Common password check (basic example - consider using a dictionary)
  const commonPasswords = [
    "password",
    "12345678",
    "qwerty123",
    "letmein",
    "welcome",
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push("Password is too common and easily guessable");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Optional: Helper function for quick validation
export const isPasswordValid = (password: string): boolean => {
  return validatePassword(password).isValid;
};
