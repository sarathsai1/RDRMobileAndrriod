// validationUtils.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateFullName = (fullName: string): boolean => {
  return fullName.trim().length > 0;
};

export const validateGstNumber = (gstNumber: string): boolean => {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstRegex.test(gstNumber);
};

export const validateAddress = (address: string): boolean => {
  return address.trim().length > 0;
};

export const validateCity = (city: string): boolean => {
  return city.trim().length > 0;
};

export const validateCountry = (country: string): boolean => {
  return country.trim().length > 0;
};

export const validatePinCode = (pinCode: string): boolean => {
  const pinCodeRegex = /^\d{6}$/;
  return pinCodeRegex.test(pinCode);
};

export const validateFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  return allowedTypes.includes(fileExtension || '');
};

export const validatePanNumber = (panNumber: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(panNumber);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

// Add more validation functions as needed
