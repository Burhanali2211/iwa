'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

  return (
    <div className="p-1">
        <header className="bg-surface p-6 rounded-lg shadow-card mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center text-sm text-text-muted mb-2">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={index} className="flex items-center">
                                {index > 0 && <span className="mx-2">/</span>}
                                {crumb.href ? (
                                    <span className="cursor-pointer hover:text-foreground" onClick={() => router.push(crumb.href!)}>{crumb.label}</span>
                                ) : (
                                    <span>{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Create Donation Campaign</h1>
                    <p className="text-text-secondary mt-1">Launch a new fundraising initiative for the community</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                    <button onClick={(e) => handleSubmit(e, true)} disabled={isLoading} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                        <Save className="h-4 w-4" />
                        {isLoading ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>
        </header>

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
        <div className="bg-surface p-8 rounded-lg shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Campaign Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {campaignTypes.map(({ value, label, icon: Icon, description }) => (
                    <div
                        key={value}
                        onClick={() => handleInputChange('type', value)}
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.type === value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                    >
                        <Icon className={`h-8 w-8 mb-3 ${formData.type === value ? 'text-primary' : 'text-text-secondary'}`} />
                        <h3 className="font-semibold text-foreground">{label}</h3>
                        <p className="text-xs text-text-muted mt-1">{description}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-surface p-8 rounded-lg shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Campaign Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Annual Ramadan Food Drive"
                  />
                  {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="Provide a detailed description of the campaign's purpose and goals."
                  />
                  {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
                </div>
            </div>
        </div>

        <div className="bg-surface p-8 rounded-lg shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Financials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Goal Amount *</label>
                    <input
                        type="number"
                        value={formData.goalAmount}
                        onChange={(e) => handleInputChange('goalAmount', e.target.value ? Number(e.target.value) : '')}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                        placeholder="e.g., 50000"
                    />
                    {errors.goalAmount && <p className="text-sm text-destructive mt-1">{errors.goalAmount}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Currency</label>
                    <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                    >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>INR</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Timeline & Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              />
              {errors.startDate && <p className="text-sm text-destructive mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Organizer *</label>
              <input
                type="text"
                value={formData.organizer}
                onChange={(e) => handleInputChange('organizer', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., Islamic Center of City"
              />
              {errors.organizer && <p className="text-sm text-destructive mt-1">{errors.organizer}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                placeholder="e.g., donations@islamiccenter.org"
              />
              {errors.contactEmail && <p className="text-sm text-destructive mt-1">{errors.contactEmail}</p>}
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg shadow-card">
          <h2 className="text-xl font-bold text-foreground mb-6">Settings & Categorization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-2">Tags</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary"
                  placeholder="Add a tag and press Enter"
                />
                <button type="button" onClick={addTag} className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-2 bg-background border border-border rounded-full px-3 py-1 text-sm">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="h-4 w-4 text-text-muted hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isPublished"
                        checked={formData.isPublished}
                        onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isPublished" className="text-sm font-medium text-text-secondary">Publish on site</label>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isFeatured"
                        checked={formData.isFeatured}
                        onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-text-secondary">Mark as featured</label>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="isUrgent"
                        checked={formData.isUrgent}
                        onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="isUrgent" className="text-sm font-medium text-text-secondary">Mark as urgent</label>
                </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
            <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                disabled={isLoading}
                className="px-6 py-2 border border-border rounded-md text-text-secondary hover:bg-background"
            >
                Save as Draft
            </button>
            <button
                type="submit"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isLoading}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
                {isLoading ? 'Publishing...' : 'Publish Campaign'}
            </button>
        </div>
      </form>
    </div>
  );
}
