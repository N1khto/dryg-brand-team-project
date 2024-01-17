export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    return 'Please enter a valid email address';
  }
}

export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  } else if (password.length < 5) {
    return 'Ensure password has at least 5 characters';
  }
}

export const validateFirstName = (value: string) => {
  if (!value) {
    return 'First name is required';
  } else if (value.length < 2) {
    return 'Ensure name has at least 2 characters';
  }
}

export const validateLastName = (value: string) => {
  if (!value) {
    return 'Last name is required';
  } else if (value.length < 2) {
    return 'Ensure surname has at least 2 characters';
  }
}



export const validatePhone = (phone: string) => {
  if (!phone) {
    return 'Phone is required';
  } else if (
    !/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}$)/gm.test(phone)
  ) {
    return 'Enter phone in format: +380 XX XXX XX XX';
  }
}


export const validateField= (value: string) => {
  if (!value) {
    return 'Last name is required';
  } 
}
