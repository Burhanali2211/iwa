'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CMSLayout from '@/components/admin/CMSLayout';
import {
  Save,
  Eye,
  RefreshCw,
  Image as ImageIcon,
  Type,
  Link,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  backgroundImage: string;
  overlayOpacity: number;
  isActive: boolean;
}

export default function HeroSectionEditor() {
  const [content, setContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    description: '',
    primaryButtonText: '',
    primaryButtonLink: '',
    secondaryButtonText: '',
    secondaryButtonLink: '',
    backgroundImage: '',
    overlayOpacity: 50,
    isActive: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      setIsLoading(true);
      // Mock data - replace with actual API call
      const mockContent: HeroContent = {
        title: 'Welcome to Our Islamic Center',
        subtitle: 'Building Faith, Knowledge, and Community',
        description: 'Join our vibrant Islamic community dedicated to spiritual growth, education, and service. Discover a place where faith meets learning and community bonds are strengthened.',
        primaryButtonText: 'Explore Programs',
        primaryButtonLink: '/school',
        secondaryButtonText: 'Join Community',
        secondaryButtonLink: '/contact',
        backgroundImage: '/images/mosque-hero.jpg',
        overlayOpacity: 60,
        isActive: true
      };
      
      setContent(mockContent);
    } catch (error) {
      console.error('Error fetching hero content:', error);
      toast.error('Failed to load hero content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof HeroContent, value: string | number | boolean) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Validate required fields
      if (!content.title.trim()) {
        toast.error('Title is required');
        return;
      }
      
      if (!content.subtitle.trim()) {
        toast.error('Subtitle is required');
        return;
      }

      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Hero section updated successfully!');
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast.error('Failed to save hero content');
    } finally {
      setIsSaving(false);
    }
  };

  const breadcrumbs = [
    { label: 'Admin', href: '/admin' },
    { label: 'CMS', href: '/admin/cms' },
    { label: 'Home Page', href: '/admin/cms/home' },
    { label: 'Hero Section' }
  ];

  const actions = (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => window.open('/', '_blank')}
        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <Eye className="h-4 w-4" />
        <span>Preview</span>
      </button>
      <button
        onClick={handleSave}
        disabled={!hasChanges || isSaving}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
          hasChanges && !isSaving
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isSaving ? (
          <RefreshCw className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <CMSLayout title="Hero Section Editor" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout 
      title="Hero Section Editor" 
      description="Edit the main hero section content and appearance"
      breadcrumbs={breadcrumbs}
      actions={actions}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Editor */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Type className="h-5 w-5 mr-2 text-green-600" />
              Content Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title *
                </label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter main title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle *
                </label>
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter subtitle"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={content.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter description text"
                />
              </div>
            </div>
          </div>

          {/* Button Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Link className="h-5 w-5 mr-2 text-blue-600" />
              Button Settings
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.primaryButtonText}
                    onChange={(e) => handleInputChange('primaryButtonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Button text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.primaryButtonLink}
                    onChange={(e) => handleInputChange('primaryButtonLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="/page-url"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.secondaryButtonText}
                    onChange={(e) => handleInputChange('secondaryButtonText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Button text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.secondaryButtonLink}
                    onChange={(e) => handleInputChange('secondaryButtonLink', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="/page-url"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visual Settings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-purple-600" />
              Visual Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image URL
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={content.backgroundImage}
                    onChange={(e) => handleInputChange('backgroundImage', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overlay Opacity: {content.overlayOpacity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={content.overlayOpacity}
                  onChange={(e) => handleInputChange('overlayOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={content.isActive}
                  onChange={(e) => handleInputChange('isActive', e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Section is active and visible
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-blue-600" />
              Live Preview
            </h3>
            
            <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
              {content.backgroundImage && (
                <Image
                  src={content.backgroundImage}
                  alt="Hero background"
                  fill
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div 
                className="absolute inset-0 bg-black"
                style={{ opacity: content.overlayOpacity / 100 }}
              />
              <div className="relative z-10 flex items-center justify-center h-full p-8 text-center text-white">
                <div className="max-w-2xl">
                  {content.title && (
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      {content.title}
                    </h1>
                  )}
                  {content.subtitle && (
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-green-400">
                      {content.subtitle}
                    </h2>
                  )}
                  {content.description && (
                    <p className="text-lg mb-8 text-gray-200">
                      {content.description}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {content.primaryButtonText && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                        {content.primaryButtonText}
                      </button>
                    )}
                    {content.secondaryButtonText && (
                      <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors">
                        {content.secondaryButtonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CMSLayout>
  );
}
