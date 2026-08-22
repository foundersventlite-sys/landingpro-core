export const isRequired = (value) => value !== undefined && value !== null && String(value).trim() !== "";

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

export const isValidPhone = (phone) => /^[0-9+\-\s]{10,15}$/.test(String(phone).trim());

export const validateLogin = ({ email, password }) => {
  const errors = {};
  if (!isValidEmail(email)) errors.email = "Valid email is required";
  if (!isRequired(password)) errors.password = "Password is required";
  return errors;
};

export const validateClient = ({ name, email, password }) => {
  const errors = {};
  if (!isRequired(name)) errors.name = "Name is required";
  if (!isValidEmail(email)) errors.email = "Valid email is required";
  if (!isRequired(password)) errors.password = "Password is required";
  return errors;
};

export const validateOrder = ({ customerName, phone, address }) => {
  const errors = {};
  if (!isRequired(customerName)) errors.customerName = "Customer name is required";
  if (!isValidPhone(phone)) errors.phone = "Valid phone number is required";
  if (!isRequired(address)) errors.address = "Address is required";
  return errors;
};
