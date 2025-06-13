import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Eye, EyeOff } from 'lucide-react';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  showPasswordToggle?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className = '',
  options,
  rows,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  const baseInputClasses = `
    w-full px-4 py-3 border border-gray-300 rounded-lg
    focus:ring-2 focus:ring-green-500 focus:border-transparent
    transition-colors duration-200 text-gray-900 placeholder-gray-500
    ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white'}
    ${className}
  `;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <Field
            as="textarea"
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows || 4}
            className={baseInputClasses}
          />
        );

      case 'select':
        return (
          <Field
            as="select"
            name={name}
            disabled={disabled}
            className={baseInputClasses}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <Field
              type="checkbox"
              name={name}
              disabled={disabled}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
              {label}
            </label>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <Field
                  type="radio"
                  name={name}
                  value={option.value}
                  disabled={disabled}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="relative">
            <Field
              type={inputType}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              className={baseInputClasses}
            />
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderInput()}
        <ErrorMessage
          name={name}
          component="div"
          className="mt-1 text-sm text-red-600"
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );
};

// Loading Button Component
interface LoadingButtonProps {
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  type = 'button',
  isLoading = false,
  disabled = false,
  children,
  className = '',
  variant = 'primary',
  onClick,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center px-6 py-3 border border-transparent 
    text-base font-medium rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

// Form Container Component
interface FormContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  title,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-green-100 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Error Alert Component
interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-800">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex text-red-400 hover:text-red-600"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
