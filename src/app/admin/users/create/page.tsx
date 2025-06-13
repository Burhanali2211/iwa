'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { FormField, LoadingButton, FormContainer, ErrorAlert } from '@/components/forms/FormField';
import { createUserSchema } from '@/lib/validationSchemas';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  // Student specific fields
  studentProfile?: {
    rollNumber: string;
    class: string;
    section: string;
    fatherName: string;
    motherName: string;
    guardianPhone: string;
    emergencyContact: string;
    bloodGroup: string;
    medicalInfo: string;
  };
  // Teacher specific fields
  teacherProfile?: {
    employeeId: string;
    department: string;
    subjects: string[];
    qualification: string;
    experience: number;
    isClassTeacher: boolean;
    classAssigned: string;
    salary: number;
  };
}

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  studentProfile?: StudentProfile;
  teacherProfile?: TeacherProfile;
}

export default function CreateUserPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues: CreateUserFormData = {
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    phone: '',
    address: '',
    dateOfBirth: '',
    studentProfile: {
      rollNumber: '',
      class: '',
      section: '',
      fatherName: '',
      motherName: '',
      guardianPhone: '',
      emergencyContact: '',
      bloodGroup: '',
      medicalInfo: '',
    },
    teacherProfile: {
      employeeId: '',
      department: '',
      subjects: [],
      qualification: '',
      experience: 0,
      isClassTeacher: false,
      classAssigned: '',
      salary: 0,
    },
  };

  const roleOptions = [
    { value: 'STUDENT', label: 'Student' },
    { value: 'TEACHER', label: 'Teacher' },
    { value: 'PARENT', label: 'Parent' },
    { value: 'ADMIN', label: 'Admin' },
  ];

  const classOptions = [
    { value: '1', label: 'Class 1' },
    { value: '2', label: 'Class 2' },
    { value: '3', label: 'Class 3' },
    { value: '4', label: 'Class 4' },
    { value: '5', label: 'Class 5' },
    { value: '6', label: 'Class 6' },
    { value: '7', label: 'Class 7' },
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' },
  ];

  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const departmentOptions = [
    { value: 'Islamic Studies', label: 'Islamic Studies' },
    { value: 'Arabic', label: 'Arabic' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Computer Science', label: 'Computer Science' },
  ];

  const handleSubmit = async (values: CreateUserFormData) => {
    try {
      setIsLoading(true);
      setError('');

      // Prepare the data based on role
      const userData: UserData = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        phone: values.phone,
        address: values.address,
        dateOfBirth: values.dateOfBirth,
      };

      if (values.role === 'STUDENT' && values.studentProfile) {
        userData.studentProfile = values.studentProfile;
      } else if (values.role === 'TEACHER' && values.teacherProfile) {
        userData.teacherProfile = values.teacherProfile;
      }

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('User created successfully!');
        router.push('/admin/users');
      } else {
        setError(data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Create user error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Users
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New User</h1>
          <p className="text-gray-600 mt-1">Add a new user to the system</p>
        </div>

        <FormContainer title="User Information" subtitle="Fill in the details to create a new user account">
          <Formik
            initialValues={initialValues}
            validationSchema={createUserSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="space-y-6">
                {error && <ErrorAlert message={error} onClose={() => setError('')} />}

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="name"
                    label="Full Name"
                    placeholder="Enter full name"
                    required
                  />
                  <FormField
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    required
                    showPasswordToggle
                  />
                  <FormField
                    name="role"
                    label="Role"
                    type="select"
                    options={roleOptions}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter phone number"
                  />
                  <FormField
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                  />
                </div>

                <FormField
                  name="address"
                  label="Address"
                  type="textarea"
                  placeholder="Enter address"
                  rows={3}
                />

                {/* Student Profile Fields */}
                {values.role === 'STUDENT' && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        name="studentProfile.rollNumber"
                        label="Roll Number"
                        placeholder="Enter roll number"
                      />
                      <FormField
                        name="studentProfile.class"
                        label="Class"
                        type="select"
                        options={classOptions}
                        required
                      />
                      <FormField
                        name="studentProfile.section"
                        label="Section"
                        placeholder="Enter section"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="studentProfile.fatherName"
                        label="Father's Name"
                        placeholder="Enter father's name"
                        required
                      />
                      <FormField
                        name="studentProfile.motherName"
                        label="Mother's Name"
                        placeholder="Enter mother's name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="studentProfile.guardianPhone"
                        label="Guardian Phone"
                        placeholder="Enter guardian phone"
                        required
                      />
                      <FormField
                        name="studentProfile.emergencyContact"
                        label="Emergency Contact"
                        placeholder="Enter emergency contact"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="studentProfile.bloodGroup"
                        label="Blood Group"
                        type="select"
                        options={bloodGroupOptions}
                      />
                      <FormField
                        name="studentProfile.medicalInfo"
                        label="Medical Information"
                        type="textarea"
                        placeholder="Enter any medical information"
                        rows={2}
                      />
                    </div>
                  </div>
                )}

                {/* Teacher Profile Fields */}
                {values.role === 'TEACHER' && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Teacher Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="teacherProfile.employeeId"
                        label="Employee ID"
                        placeholder="Enter employee ID"
                      />
                      <FormField
                        name="teacherProfile.department"
                        label="Department"
                        type="select"
                        options={departmentOptions}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="teacherProfile.qualification"
                        label="Qualification"
                        placeholder="Enter qualification"
                        required
                      />
                      <FormField
                        name="teacherProfile.experience"
                        label="Experience (Years)"
                        type="number"
                        placeholder="Enter years of experience"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        name="teacherProfile.classAssigned"
                        label="Class Assigned"
                        type="select"
                        options={classOptions}
                      />
                      <FormField
                        name="teacherProfile.salary"
                        label="Salary"
                        type="number"
                        placeholder="Enter salary"
                      />
                    </div>

                    <FormField
                      name="teacherProfile.isClassTeacher"
                      label="Is Class Teacher"
                      type="checkbox"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    variant="primary"
                  >
                    Create User
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </main>
      
      <Footer />
    </div>
  );
}
