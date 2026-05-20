// utils/testData.ts

export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performance: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
};

export const products = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
  'sauce-labs-fleece-jacket',
  'sauce-labs-onesie',
  'test.allthethings()-t-shirt-(red)',
];

export const checkoutData = {
  valid: [
    { firstName: 'John', lastName: 'Doe', postalCode: '12345' },
    { firstName: 'Carlos', lastName: 'García', postalCode: '28001' },
    { firstName: 'María', lastName: 'López', postalCode: '08001' },
  ],
  invalid: [
    { firstName: '', lastName: 'Doe', postalCode: '12345', error: 'First Name is required' },
    { firstName: 'John', lastName: '', postalCode: '12345', error: 'Last Name is required' },
    { firstName: 'John', lastName: 'Doe', postalCode: '', error: 'Postal Code is required' },
  ],
};
