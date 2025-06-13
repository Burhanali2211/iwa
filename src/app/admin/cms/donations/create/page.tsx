'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CMSLayout from '@/components/admin/CMSLayout';
import { 
  Save, 
  Eye, 
  ArrowLeft,
  Plus,
  X,
  DollarSign,
  Heart,
  School,
  Building,
  AlertTriangle,
  Zap,
  Gift
} from 'lucide-react';
import toast from 'react-hot-toast';

interface DonationCampaignForm {
  title: string;
  description: string;
  type: 'general' | 'mosque' | 'education' | 'charity' | 'emergency' | 'zakat' | 'sadaqah';
  category: string;
  goalAmount: number | '';
  currency: string;
  startDate: string;
  endDate: string;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  isActive: boolean;
  isUrgent: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  featuredImage: string;
  paymentMethods: string[];
  tags: string[];
  additionalInfo: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
}

interface FormErrors {
  title?: string;
  description?: string;
  goalAmount?: string;
  category?: string;
  startDate?: string;
  organizer?: string;
  contactEmail?: string;
}

const campaignTypes = [
  { value: 'general', label: 'General Donation', icon: DollarSign, description: 'General purpose donations' },
  { value: 'mosque', label: 'Mosque Fund', icon: Building, description: 'Mosque construction and maintenance' },
  { value: 'education', label: 'Education', icon: School, description: 'Educational programs and scholarships' },
  { value: 'charity', label: 'Charity', icon: Heart, description: 'Charitable causes and community aid' },
  { value: 'emergency', label: 'Emergency Relief', icon: AlertTriangle, description: 'Urgent humanitarian aid' },
  { value: 'zakat', label: 'Zakat', icon: Zap, description: 'Obligatory Islamic charity' },
  { value: 'sadaqah', label: 'Sadaqah', icon: Gift, description: 'Voluntary charitable giving' }
];

const categories = [
  'Infrastructure', 'Humanitarian Aid', 'Education', 'Food Aid', 'Medical Aid',
  'Orphan Support', 'Widow Support', 'Community Development', 'Religious Programs',
  'Youth Programs', 'Women Programs', 'Elderly Care'
];

const paymentMethodOptions = [
  { value: 'card', label: 'Credit/Debit Card' },
  { value: 'bank', label: 'Bank Transfer' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'cash', label: 'Cash' }
];

export default function CreateDonationCampaign() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  
  const [formData, setFormData] = useState<DonationCampaignForm>({
    title: '',
    description: '',
    type: 'general',
    category: '',
    goalAmount: '',
    currency: 'USD',
    startDate: '',
    endDate: '',
    organizer: '',
    contactEmail: '',
    contactPhone: '',
    isActive: true,
    isUrgent: false,
    isFeatured: false,
    isPublished: false,
    featuredImage: '',
    paymentMethods: ['card'],
    tags: [],
    additionalInfo: '',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: ''
    }
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.goalAmount || formData.goalAmount <= 0) {
      newErrors.goalAmount = 'Goal amount must be greater than 0';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.organizer.trim()) {
      newErrors.organizer = 'Organizer is required';
    }

    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        isPublished: publish,
        goalAmount: Number(formData.goalAmount)
      };

      const response = await fetch('/api/cms/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(`Campaign ${publish ? 'published' : 'saved as draft'} successfully!`);
        router.push('/admin/cms/donations');
      } else {
        toast.error(result.error || 'Failed to save campaign');
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      toast.error('Failed to save campaign');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof DonationCampaignForm, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear errors for fields that have validation errors
    if (field in errors && field in { title: '', description: '', goalAmount: '', category: '', startDate: '', organizer: '', contactEmail: '' }) {
      setErrors(prev => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };



  const handlePaymentMethodChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: checked 
        ? [...prev.paymentMethods, method]
        : prev.paymentMethods.filter(m => m !== method)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Donations', href: '/admin/cms/donations' },
    { label: 'Create Campaign' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => router.back()}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>
      <button
        onClick={(e) => handleSubmit(e, false)}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
      >
        <Save className="h-4 w-4" />
        <span>Save Draft</span>
      </button>
      <button
        onClick={(e) => handleSubmit(e, true)}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors disabled:opacity-50"
      >
        <Eye className="h-4 w-4" />
        <span>Publish</span>
      </button>
    </div>
  );

  return (
    <CMSLayout
      title="Create Donation Campaign"
      description="Launch a new fundraising campaign for your Islamic community"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
        {/* Campaign Type Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {campaignTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('type', type.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.type === type.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`h-6 w-6 mb-2 ${
                    formData.type === type.value ? 'text-green-600' : 'text-gray-600'
                  }`} />
                  <h4 className="font-medium text-gray-900">{type.label}</h4>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter campaign title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the purpose and goals of this campaign..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organizer *
              </label>
              <input
                type="text"
                value={formData.organizer}
                onChange={(e) => handleInputChange('organizer', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.organizer ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Organization or person organizing this campaign"
              />
              {errors.organizer && (
                <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>
              )}
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Amount *
              </label>
              <input
                type="number"
                value={formData.goalAmount}
                onChange={(e) => handleInputChange('goalAmount', Number(e.target.value))}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.goalAmount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="50000"
                min="1"
              />
              {errors.goalAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.goalAmount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => handleInputChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Campaign Duration */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Duration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date (Optional)
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="contact@islamiccenter.org"
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+1-555-0123"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethodOptions.map((method) => (
              <div key={method.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={method.value}
                  checked={formData.paymentMethods.includes(method.value)}
                  onChange={(e) => handlePaymentMethodChange(method.value, e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor={method.value} className="ml-2 block text-sm text-gray-900">
                  {method.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any additional information about the campaign, tax deductibility, etc."
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isUrgent"
                checked={formData.isUrgent}
                onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="isUrgent" className="ml-2 block text-sm text-gray-900">
                Mark as Urgent Campaign
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                Featured Campaign
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active Campaign (accepting donations)
              </label>
            </div>
          </div>
        </div>
      </form>
    </CMSLayout>
  );
}
