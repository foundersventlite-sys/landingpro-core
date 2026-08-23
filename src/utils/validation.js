export const validate = (value, rules = {}) => {
  const errors = {};

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const fieldValue = value?.[field];

    if (fieldRules.required && !String(fieldValue ?? "").trim()) {
      errors[field] = fieldRules.message || `${field} is required`;
    }

    if (fieldRules.minLength && String(fieldValue ?? "").length < fieldRules.minLength) {
      errors[field] = fieldRules.message || `${field} is too short`;
    }

    if (fieldRules.maxLength && String(fieldValue ?? "").length > fieldRules.maxLength) {
      errors[field] = fieldRules.message || `${field} is too long`;
    }

    if (fieldRules.pattern && fieldValue && !fieldRules.pattern.test(String(fieldValue))) {
      errors[field] = fieldRules.message || `${field} is invalid`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
