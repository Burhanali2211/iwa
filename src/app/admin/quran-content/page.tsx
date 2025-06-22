'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Download,
  Upload,
  Globe,
  Languages,
  FileText,
  Star,
  Book
} from 'lucide-react';

interface QuranContent {
  id: string;
  surah: number;
  ayah: number;
  arabicText: string;
  translation: string;
  transliteration: string;
  tafsir: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  language: string;
  translator: string;
}

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  englishName: string;
  revelationType: 'Meccan' | 'Medinan';
  ayahs: number;
}

export default function QuranContentPage() {
  const router = useRouter();
  const [quranContent, setQuranContent] = useState<QuranContent[]>([
    {
      id: '1',
      surah: 1,
      ayah: 1,
      arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      transliteration: 'Bismillahi ar-rahmani ar-raheem',
      tafsir: 'This verse is known as the Basmala and is recited at the beginning of every surah except Surah At-Tawbah.',
      category: 'Opening',
      tags: ['basmala', 'opening', 'mercy'],
      isPublished: true,
      language: 'English',
      translator: 'Saheeh International'
    },
    {
      id: '2',
      surah: 1,
      ayah: 2,
      arabicText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'All praise is due to Allah, Lord of the worlds.',
      transliteration: 'Al-hamdu lillahi rabbi al-alameen',
      tafsir: 'This verse teaches us to praise Allah and acknowledge Him as the Lord of all creation.',
      category: 'Praise',
      tags: ['praise', 'lord', 'worlds'],
      isPublished: true,
      language: 'English',
      translator: 'Saheeh International'
    }
  ]);

  const [surahs] = useState<Surah[]>([
    { number: 1, name: 'Al-Fatiha', arabicName: 'الفاتحة', englishName: 'The Opening', revelationType: 'Meccan', ayahs: 7 },
    { number: 2, name: 'Al-Baqarah', arabicName: 'البقرة', englishName: 'The Cow', revelationType: 'Medinan', ayahs: 286 },
    { number: 3, name: 'Al-Imran', arabicName: 'آل عمران', englishName: 'Family of Imran', revelationType: 'Medinan', ayahs: 200 },
    { number: 4, name: 'An-Nisa', arabicName: 'النساء', englishName: 'The Women', revelationType: 'Medinan', ayahs: 176 },
    { number: 5, name: 'Al-Ma\'idah', arabicName: 'المائدة', englishName: 'The Table Spread', revelationType: 'Medinan', ayahs: 120 }
  ]);

  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterLanguage, setFilterLanguage] = useState('ALL');
  const [showContentModal, setShowContentModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<QuranContent | null>(null);

  const categories = ['ALL', 'Opening', 'Praise', 'Guidance', 'Mercy', 'Judgment', 'Stories', 'Laws'];
  const languages = ['ALL', 'English', 'Arabic', 'Urdu', 'French', 'Spanish', 'German'];
  const translators = ['Saheeh International', 'Pickthall', 'Yusuf Ali', 'Hilali & Khan', 'Dr. Ghali'];

  const filteredContent = quranContent.filter(content => {
    const matchesSearch = content.arabicText.includes(searchTerm) ||
                         content.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.transliteration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || content.category === filterCategory;
    const matchesLanguage = filterLanguage === 'ALL' || content.language === filterLanguage;
    const matchesSurah = content.surah === selectedSurah;
    
    return matchesSearch && matchesCategory && matchesLanguage && matchesSurah;
  });

  const handleAddContent = () => {
    setSelectedContent(null);
    setShowContentModal(true);
  };

  const handleEditContent = (content: QuranContent) => {
    setSelectedContent(content);
    setShowContentModal(true);
  };

  const handleDeleteContent = (contentId: string) => {
    if (confirm('Are you sure you want to delete this Quran content?')) {
      setQuranContent(prev => prev.filter(content => content.id !== contentId));
      toast.success('Content deleted successfully');
    }
  };

  const handleSaveContent = (contentData: Omit<QuranContent, 'id'>) => {
    if (selectedContent) {
      // Edit existing content
      setQuranContent(prev => prev.map(content => 
        content.id === selectedContent.id 
          ? { ...contentData, id: selectedContent.id }
          : content
      ));
      toast.success('Content updated successfully');
    } else {
      // Add new content
      const newContent = { ...contentData, id: Date.now().toString() };
      setQuranContent(prev => [...prev, newContent]);
      toast.success('Content added successfully');
    }
    setShowContentModal(false);
  };

  const handleBulkUpload = () => {
    toast.success('Bulk upload feature coming soon!');
  };

  const handleExport = () => {
    toast.success('Export feature coming soon!');
  };

  const currentSurah = surahs.find(s => s.number === selectedSurah);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quran Content Management</h1>
          <p className="text-text-secondary">Manage Quran verses, translations, and tafsir</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleBulkUpload}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Bulk Upload</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={handleAddContent}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Content</span>
          </button>
        </div>
      </div>

      {/* Current Surah Info */}
      {currentSurah && (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Surah {currentSurah.number}: {currentSurah.englishName}
              </h2>
              <p className="text-2xl font-bold mb-1">{currentSurah.arabicName}</p>
              <p className="text-sm opacity-90">
                {currentSurah.revelationType} • {currentSurah.ayahs} verses
              </p>
            </div>
            <div className="text-right">
              <Book className="h-12 w-12 opacity-80" />
              <p className="text-sm opacity-90 mt-2">Quran Content</p>
            </div>
          </div>
        </div>
      )}

      {/* Surah Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Select Surah:</label>
          <select
            value={selectedSurah}
            onChange={(e) => setSelectedSurah(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {surahs.map(surah => (
              <option key={surah.number} value={surah.number}>
                {surah.number}. {surah.englishName} ({surah.arabicName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {languages.map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-500 flex items-center justify-center">
            {filteredContent.length} verses found
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="space-y-4">
        {filteredContent.map((content) => (
          <div key={content.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {content.surah}:{content.ayah}
                </div>
                <div className="flex items-center space-x-2">
                  {content.isPublished ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Published</span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Draft</span>
                  )}
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{content.language}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditContent(content)}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <Edit className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDeleteContent(content.id)}
                  className="p-2 hover:bg-red-100 rounded"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Arabic Text */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Arabic Text</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-lg text-right font-arabic leading-relaxed">{content.arabicText}</p>
                </div>
              </div>

              {/* Translation */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Translation ({content.translator})</h4>
                <p className="text-gray-900">{content.translation}</p>
              </div>

              {/* Transliteration */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Transliteration</h4>
                <p className="text-gray-600 italic">{content.transliteration}</p>
              </div>

              {/* Tafsir */}
              {content.tafsir && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tafsir</h4>
                  <p className="text-gray-700 text-sm">{content.tafsir}</p>
                </div>
              )}

              {/* Tags */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterCategory !== 'ALL' || filterLanguage !== 'ALL'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding Quran content for this surah.'
            }
          </p>
          {!searchTerm && filterCategory === 'ALL' && filterLanguage === 'ALL' && (
            <button
              onClick={handleAddContent}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add First Content
            </button>
          )}
        </div>
      )}

      {/* Content Modal */}
      {showContentModal && (
        <ContentModal
          content={selectedContent}
          onClose={() => setShowContentModal(false)}
          onSave={handleSaveContent}
          surahs={surahs}
          categories={categories.filter(c => c !== 'ALL')}
          languages={languages.filter(l => l !== 'ALL')}
          translators={translators}
        />
      )}
    </div>
  );
}

// Content Modal Component
interface ContentModalProps {
  content: QuranContent | null;
  onClose: () => void;
  onSave: (contentData: Omit<QuranContent, 'id'>) => void;
  surahs: Surah[];
  categories: string[];
  languages: string[];
  translators: string[];
}

function ContentModal({ content, onClose, onSave, surahs, categories, languages, translators }: ContentModalProps) {
  const [formData, setFormData] = useState({
    surah: content?.surah || 1,
    ayah: content?.ayah || 1,
    arabicText: content?.arabicText || '',
    translation: content?.translation || '',
    transliteration: content?.transliteration || '',
    tafsir: content?.tafsir || '',
    category: content?.category || 'Guidance',
    tags: content?.tags || [],
    isPublished: content?.isPublished ?? false,
    language: content?.language || 'English',
    translator: content?.translator || 'Saheeh International'
  });

  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.arabicText.trim() || !formData.translation.trim()) {
      toast.error('Arabic text and translation are required');
      return;
    }
    onSave(formData);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {content ? 'Edit Quran Content' : 'Add New Quran Content'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <span className="text-2xl">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surah *
                </label>
                <select
                  value={formData.surah}
                  onChange={(e) => setFormData({...formData, surah: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  {surahs.map(surah => (
                    <option key={surah.number} value={surah.number}>
                      {surah.number}. {surah.englishName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ayah Number *
                </label>
                <input
                  type="number"
                  value={formData.ayah}
                  onChange={(e) => setFormData({...formData, ayah: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arabic Text *
              </label>
              <textarea
                value={formData.arabicText}
                onChange={(e) => setFormData({...formData, arabicText: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-right"
                placeholder="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Translation *
              </label>
              <textarea
                value={formData.translation}
                onChange={(e) => setFormData({...formData, translation: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="In the name of Allah, the Entirely Merciful, the Especially Merciful."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transliteration
              </label>
              <input
                type="text"
                value={formData.transliteration}
                onChange={(e) => setFormData({...formData, transliteration: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Bismillahi ar-rahmani ar-raheem"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tafsir (Explanation)
              </label>
              <textarea
                value={formData.tafsir}
                onChange={(e) => setFormData({...formData, tafsir: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Explanation of the verse..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Translator
                </label>
                <select
                  value={formData.translator}
                  onChange={(e) => setFormData({...formData, translator: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {translators.map(translator => (
                    <option key={translator} value={translator}>{translator}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                {content ? 'Update Content' : 'Add Content'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 