export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateForm = (
  data: Record<string, any>,
  rules: ValidationRules
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field];

    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors[field] = rule.message || `${field} is required`;
      return;
    }

    if (value && typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        errors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
        return;
      }

      if (rule.maxLength && value.length > rule.maxLength) {
        errors[field] = rule.message || `${field} must be no more than ${rule.maxLength} characters`;
        return;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        errors[field] = rule.message || `${field} format is invalid`;
        return;
      }
    }
  });

  return errors;
};

// Common validation rules
export const commonValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    required: true,
    minLength: 6,
    message: 'Password must be at least 6 characters long',
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: 'Name must be between 2 and 50 characters',
  },
};
