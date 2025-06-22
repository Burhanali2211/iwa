'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  User,
  Plus,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Users,
  Building
} from 'lucide-react';

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  department: string;
  position: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  isActive: boolean;
  sendWelcomeEmail: boolean;
}

export default function CreateUserPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<UserForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    department: '',
    position: '',
    address: '',
    city: '',
    country: '',
    dateOfBirth: '',
    gender: '',
    isActive: true,
    sendWelcomeEmail: true
  });

  const roles = [
    { value: 'admin', label: 'Administrator', description: 'Full system access' },
    { value: 'moderator', label: 'Moderator', description: 'Content moderation and user management' },
    { value: 'teacher', label: 'Teacher', description: 'Educational content management' },
    { value: 'imam', label: 'Imam', description: 'Religious content and guidance' },
    { value: 'user', label: 'Regular User', description: 'Basic access to public content' }
  ];

  const departments = [
    'Administration',
    'Education',
    'Religious Affairs',
    'Community Services',
    'Finance',
    'IT Support',
    'Marketing',
    'Events'
  ];

  const positions = [
    'Manager',
    'Coordinator',
    'Specialist',
    'Assistant',
    'Consultant',
    'Director',
    'Supervisor'
  ];

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Saudi Arabia',
    'UAE',
    'Pakistan',
    'India',
    'Malaysia',
    'Indonesia',
    'Turkey',
    'Egypt',
    'Morocco',
    'Other'
  ];

  const handleInputChange = (field: keyof UserForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      toast.error('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (!formData.role) {
      toast.error('Role is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('User created successfully!');
      router.push('/admin/users');
    } catch (error) {
      toast.error('Failed to create user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/users');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New User</h1>
          <p className="text-text-secondary">Add a new user to the Islamic community platform</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{isLoading ? 'Creating...' : 'Create User'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security & Access
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label} - {role.description}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select Position</option>
                {positions.map(pos => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Address Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Street address, apartment, suite, etc."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Additional Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Account is active</span>
              </label>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.sendWelcomeEmail}
                  onChange={(e) => handleInputChange('sendWelcomeEmail', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Send welcome email</span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Plus className="h-4 w-4" />
            )}
            <span>{isLoading ? 'Creating User...' : 'Create User'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
