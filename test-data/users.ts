export const users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
  },
  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
  },
  wrongPassword: {
    username: "standard_user",
    password: "wrong_password",
  },
};

export const loginErrors = {
  lockedOut: "Epic sadface: Sorry, this user has been locked out.",
  wrongPassword: "Epic sadface: Username and password do not match any user in this service",
  emptyUsername: "Epic sadface: Username is required",
};

export const checkoutInfo = {
  firstName: "Anna",
  lastName: "Test",
  postalCode: "00-001",
};