export interface ValidationRule {
  validate: (val: string) => boolean;
  message: string;
}

export const validators = {
  required: (fieldName: string = 'This field'): ValidationRule => ({
    validate: (val: string) => val !== undefined && val !== null && val.trim().length > 0,
    message: `${fieldName} is required.`,
  }),

  email: (): ValidationRule => ({
    validate: (val: string) => {
      if (!val) return false;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val.trim());
    },
    message: 'Please enter a valid email address.',
  }),

  phone: (): ValidationRule => ({
    validate: (val: string) => {
      if (!val) return true; // Optional if empty unless paired with required
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
      return phoneRegex.test(val.trim());
    },
    message: 'Please enter a valid telephone number.',
  }),

  minLength: (min: number, fieldName: string = 'Field'): ValidationRule => ({
    validate: (val: string) => (val ? val.trim().length >= min : false),
    message: `${fieldName} must be at least ${min} characters.`,
  }),

  minAmount: (min: number): { validate: (num: number) => boolean; message: string } => ({
    validate: (num: number) => typeof num === 'number' && num >= min,
    message: `Minimum donation amount is $${min}.`,
  }),
};

export function validateField(value: string, rules: ValidationRule[]): string | null {
  for (const rule of rules) {
    if (!rule.validate(value)) {
      return rule.message;
    }
  }
  return null;
}
