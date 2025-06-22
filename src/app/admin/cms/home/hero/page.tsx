'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
    <div className="p-1">
        <header className="bg-surface p-6 rounded-lg shadow-card mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center text-sm text-text-muted mb-2">
                        <span className="cursor-pointer hover:text-foreground">Admin</span>
                        <span className="mx-2">/</span>
                        <span className="cursor-pointer hover:text-foreground">CMS</span>
                        <span className="mx-2">/</span>
                        <span className="cursor-pointer hover:text-foreground">Home</span>
                        <span className="mx-2">/</span>
                        <span>Hero Section</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">Hero Section Editor</h1>
                    <p className="text-text-secondary mt-1">Edit the main hero section content and appearance</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => window.open('/', '_blank')} className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-border text-text-secondary hover:bg-background">
                        <Eye className="h-4 w-4" />
                        Preview
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges || isSaving}
                        className={`flex items-center gap-2 text-sm px-4 py-2 rounded-md transition-colors ${
                            hasChanges && !isSaving
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
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
            </div>
        </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Content Editor */}
        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Type className="h-5 w-5 mr-2 text-primary" />
              Content Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Main Title *
                </label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter main title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Subtitle *
                </label>
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter subtitle"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Description
                </label>
                <textarea
                  value={content.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter description text"
                />
              </div>
            </div>
          </div>

          {/* Button Settings */}
          <div className="bg-surface rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Link className="h-5 w-5 mr-2 text-info" />
              Button Settings
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.primaryButtonText}
                    onChange={(e) => handleInputChange('primaryButtonText', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Button text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.primaryButtonLink}
                    onChange={(e) => handleInputChange('primaryButtonLink', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="/page-url"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={content.secondaryButtonText}
                    onChange={(e) => handleInputChange('secondaryButtonText', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Button text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    value={content.secondaryButtonLink}
                    onChange={(e) => handleInputChange('secondaryButtonLink', e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="/page-url"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance & Preview */}
        <div className="space-y-6">
          <div className="bg-surface rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-purple-600" />
              Appearance
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Background Image</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
                        <div className="text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="opacity" className="block text-sm font-medium text-text-secondary">
                        Overlay Opacity: <span className="font-semibold text-foreground">{content.overlayOpacity}%</span>
                    </label>
                    <input
                        id="opacity"
                        type="range"
                        min="0"
                        max="100"
                        value={content.overlayOpacity}
                        onChange={(e) => handleInputChange('overlayOpacity', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={content.isActive}
                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 block text-sm text-text-secondary">
                            Enable Hero Section
                        </span>
                    </label>
                </div>
            </div>
          </div>

          <div className="bg-surface rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Live Preview</h3>
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
                <Image
                    src="/library.jpg"
                    alt="Hero preview"
                    layout="fill"
                    objectFit="cover"
                />
                <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: content.overlayOpacity / 100 }}
                ></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-2xl font-bold">{content.title}</h1>
                    <h2 className="text-lg mt-1">{content.subtitle}</h2>
                    <p className="text-sm mt-2 max-w-md">{content.description}</p>
                    <div className="mt-4 space-x-4">
                        <button className="bg-primary px-4 py-2 rounded-md text-sm font-semibold">
                            {content.primaryButtonText}
                        </button>
                        <button className="bg-transparent border border-white px-4 py-2 rounded-md text-sm font-semibold">
                            {content.secondaryButtonText}
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
