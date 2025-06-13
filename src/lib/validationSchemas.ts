import * as Yup from 'yup';

// Common validation patterns
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Auth Schemas
export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(1, 'Password is required')
    .required('Password is required'),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  role: Yup.string()
    .oneOf(['STUDENT', 'TEACHER', 'PARENT'], 'Invalid role')
    .required('Role is required'),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .optional(),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .optional(),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// User Management Schemas
export const createUserSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  role: Yup.string()
    .oneOf(['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'], 'Invalid role')
    .required('Role is required'),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .optional(),
  address: Yup.string()
    .max(200, 'Address must be less than 200 characters')
    .optional(),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .optional(),
});

export const updateUserSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .optional(),
  email: Yup.string()
    .email('Invalid email address')
    .optional(),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .optional(),
  address: Yup.string()
    .max(200, 'Address must be less than 200 characters')
    .optional(),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .optional(),
  isActive: Yup.boolean().optional(),
});

// Student Profile Schema
export const studentProfileSchema = Yup.object({
  rollNumber: Yup.string()
    .required('Roll number is required'),
  class: Yup.string()
    .required('Class is required'),
  section: Yup.string().optional(),
  fatherName: Yup.string()
    .min(2, 'Father name must be at least 2 characters')
    .required('Father name is required'),
  motherName: Yup.string()
    .min(2, 'Mother name must be at least 2 characters')
    .optional(),
  guardianPhone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .required('Guardian phone is required'),
  emergencyContact: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .optional(),
  bloodGroup: Yup.string()
    .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Invalid blood group')
    .optional(),
  medicalInfo: Yup.string()
    .max(500, 'Medical info must be less than 500 characters')
    .optional(),
});

// Teacher Profile Schema
export const teacherProfileSchema = Yup.object({
  employeeId: Yup.string()
    .required('Employee ID is required'),
  department: Yup.string()
    .required('Department is required'),
  subjects: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one subject is required')
    .required('Subjects are required'),
  qualification: Yup.string()
    .required('Qualification is required'),
  experience: Yup.number()
    .min(0, 'Experience cannot be negative')
    .max(50, 'Experience cannot exceed 50 years')
    .required('Experience is required'),
  isClassTeacher: Yup.boolean().optional(),
  classAssigned: Yup.string().optional(),
  salary: Yup.number()
    .min(0, 'Salary cannot be negative')
    .optional(),
});

// Academic Schemas
export const createGradeSchema = Yup.object({
  studentId: Yup.string()
    .required('Student is required'),
  examName: Yup.string()
    .min(1, 'Exam name is required')
    .required('Exam name is required'),
  subject: Yup.string()
    .min(1, 'Subject is required')
    .required('Subject is required'),
  maxMarks: Yup.number()
    .positive('Max marks must be positive')
    .max(1000, 'Max marks cannot exceed 1000')
    .required('Max marks is required'),
  obtainedMarks: Yup.number()
    .min(0, 'Obtained marks cannot be negative')
    .test('max-marks-check', 'Obtained marks cannot exceed max marks', function(value) {
      const { maxMarks } = this.parent;
      if (value === undefined || value === null) return true;
      return value <= maxMarks;
    })
    .required('Obtained marks is required'),
  grade: Yup.string().optional(),
  remarks: Yup.string()
    .max(200, 'Remarks must be less than 200 characters')
    .optional(),
  examDate: Yup.date()
    .max(new Date(), 'Exam date cannot be in the future')
    .required('Exam date is required'),
});

export const createAssignmentSchema = Yup.object({
  title: Yup.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters')
    .required('Description is required'),
  subject: Yup.string()
    .min(1, 'Subject is required')
    .required('Subject is required'),
  class: Yup.string()
    .min(1, 'Class is required')
    .required('Class is required'),
  dueDate: Yup.date()
    .min(new Date(), 'Due date must be in the future')
    .required('Due date is required'),
  maxMarks: Yup.number()
    .positive('Max marks must be positive')
    .max(1000, 'Max marks cannot exceed 1000')
    .required('Max marks is required'),
  instructions: Yup.string()
    .max(500, 'Instructions must be less than 500 characters')
    .optional(),
});

export const markAttendanceSchema = Yup.object({
  userId: Yup.string()
    .required('User is required'),
  date: Yup.date()
    .max(new Date(), 'Date cannot be in the future')
    .required('Date is required'),
  status: Yup.string()
    .oneOf(['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY'], 'Invalid attendance status')
    .required('Status is required'),
  remarks: Yup.string()
    .max(200, 'Remarks must be less than 200 characters')
    .optional(),
});

// Donation Schema
export const donationSchema = Yup.object({
  donorName: Yup.string()
    .min(2, 'Donor name must be at least 2 characters')
    .required('Donor name is required'),
  donorEmail: Yup.string()
    .email('Invalid email address')
    .optional(),
  donorPhone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .optional(),
  amount: Yup.number()
    .positive('Amount must be positive')
    .min(1, 'Minimum donation amount is ₹1')
    .max(1000000, 'Maximum donation amount is ₹10,00,000')
    .required('Amount is required'),
  donationType: Yup.string()
    .oneOf(['SADAQAH', 'KHUMS', 'ZAKAT', 'STUDENT_SPONSORSHIP', 'GENERAL', 'BUILDING_FUND'], 'Invalid donation type')
    .required('Donation type is required'),
  message: Yup.string()
    .max(500, 'Message must be less than 500 characters')
    .optional(),
  isAnonymous: Yup.boolean().optional(),
});

// Contact Form Schema
export const contactSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .optional(),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .required('Message is required'),
});

// Profile Update Schema
export const profileUpdateSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  phone: Yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .optional(),
  address: Yup.string()
    .max(200, 'Address must be less than 200 characters')
    .optional(),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .optional(),
});

// Change Password Schema
export const changePasswordSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('New password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your new password'),
});
