export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export const SKILL_OPTIONS = [
  'React',
  'UI Design',
  'Accessibility',
  'JavaScript',
  'Testing',
  'Figma',
];

export const QUALIFICATION_OPTIONS = [
  'High School',
  'Diploma',
  "Bachelor's Degree",
  "Master's Degree",
  'Doctorate',
];

export const createEmptyProfile = () => ({
  fullName: '',
  dob: '',
  gender: '',
  email: '',
  mobile: '',
  address: '',
  skills: [],
  qualification: '',
  summary: '',
  photoDataUrl: '',
  photoName: '',
});

export const normalizeProfile = (profile) => ({
  ...createEmptyProfile(),
  ...profile,
  skills: Array.isArray(profile?.skills) ? profile.skills : [],
});

export const calculateAge = (dob) => {
  if (!dob) {
    return null;
  }

  const today = new Date();
  const birthDate = new Date(`${dob}T00:00:00`);

  if (Number.isNaN(birthDate.getTime())) {
    return null;
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age -= 1;
  }

  return age;
};

export const formatDisplayDate = (dob) => {
  if (!dob) {
    return 'Not provided';
  }

  const date = new Date(`${dob}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'fullName': {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return 'Full Name is required.';
      }

      if (!/^[A-Za-z\s]+$/.test(trimmedValue)) {
        return 'Full Name must contain only alphabets and spaces.';
      }

      if (trimmedValue.length < 3) {
        return 'Full Name must be at least 3 characters long.';
      }

      return '';
    }

    case 'dob': {
      if (!value) {
        return 'Date of Birth is required.';
      }

      const age = calculateAge(value);

      if (age === null || age < 18) {
        return 'You must be 18 years or older.';
      }

      return '';
    }

    case 'gender':
      return value ? '' : 'Please select a gender.';

    case 'email': {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return 'Email ID is required.';
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        return 'Please enter a valid email format.';
      }

      return '';
    }

    case 'mobile': {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return 'Mobile Number is required.';
      }

      if (!/^\d+$/.test(trimmedValue)) {
        return 'Mobile Number must contain only numbers.';
      }

      if (trimmedValue.length !== 10) {
        return 'Mobile Number must be exactly 10 digits.';
      }

      return '';
    }

    case 'address': {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return 'Address is required.';
      }

      if (trimmedValue.length < 10) {
        return 'Address must be at least 10 characters long.';
      }

      return '';
    }

    case 'skills':
      return value.length > 0 ? '' : 'Please select at least one skill.';

    case 'qualification':
      return value ? '' : 'Please select an educational qualification.';

    case 'summary': {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return 'Profile Summary is required.';
      }

      if (trimmedValue.length < 30) {
        return 'Profile Summary must be at least 30 characters long.';
      }

      return '';
    }

    default:
      return '';
  }
};

export const validateProfile = (formData) => {
  const normalizedProfile = normalizeProfile(formData);
  const fieldsToValidate = [
    'fullName',
    'dob',
    'gender',
    'email',
    'mobile',
    'address',
    'skills',
    'qualification',
    'summary',
  ];

  return fieldsToValidate.reduce((accumulator, fieldName) => {
    const errorMessage = validateField(fieldName, normalizedProfile[fieldName]);

    if (errorMessage) {
      accumulator[fieldName] = errorMessage;
    }

    return accumulator;
  }, {});
};

export const calculateCompletion = (formData) => {
  const normalizedProfile = normalizeProfile(formData);
  const completionChecks = [
    !validateField('fullName', normalizedProfile.fullName),
    !validateField('dob', normalizedProfile.dob),
    !validateField('gender', normalizedProfile.gender),
    !validateField('email', normalizedProfile.email),
    !validateField('mobile', normalizedProfile.mobile),
    !validateField('address', normalizedProfile.address),
    !validateField('skills', normalizedProfile.skills),
    !validateField('qualification', normalizedProfile.qualification),
    !validateField('summary', normalizedProfile.summary),
    Boolean(normalizedProfile.photoDataUrl),
  ];

  const completedItems = completionChecks.filter(Boolean).length;
  return Math.round((completedItems / completionChecks.length) * 100);
};
