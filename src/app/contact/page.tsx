'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Banpora Chattergam",
        "191113 Kashmir",
        "India"
      ],
      color: "text-green-600"
    },
    {
      icon: Phone,
      title: "Contact",
      details: [
        "Contact us for more information",
        "Visit our location in Chattergam",
        "Connect through social media"
      ],
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        "info@idarahwaliulaser.org",
        "For general inquiries",
        "Library and Maktab information"
      ],
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Services",
      details: [
        "Library Access",
        "Maktab Wali Ul Aser",
        "Islamic Knowledge Center"
      ],
      color: "text-orange-600"
    }
  ];

  const departments = [
    { name: "General Inquiry", email: "info@idarahwaliulaser.org" },
    { name: "Library Services", email: "library@idarahwaliulaser.org" },
    { name: "Maktab Wali Ul Aser", email: "maktab@idarahwaliulaser.org" },
    { name: "Religious Programs", email: "programs@idarahwaliulaser.org" },
    { name: "Community Services", email: "community@idarahwaliulaser.org" },
    { name: "Donations & Support", email: "support@idarahwaliulaser.org" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 pt-32 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                We're here to help and answer any questions you might have
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Multiple ways to reach us for all your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                    <div className={`inline-flex p-3 rounded-full bg-white mb-4 ${info.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <MessageSquare className="h-6 w-6 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                      >
                        <option value="">Select a subject</option>
                        {departments.map((dept, index) => (
                          <option key={index} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Map and Additional Info */}
              <div className="space-y-8">
                {/* Google Map Placeholder */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Find Us</h3>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive Google Map</p>
                      <p className="text-sm">Banpora Chattergam, Kashmir</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Get Directions
                    </a>
                  </div>
                </div>

                {/* WhatsApp Contact */}
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/15551234567"
                      className="flex items-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <MessageSquare className="h-5 w-5 mr-3" />
                      <div>
                        <p className="font-semibold">WhatsApp</p>
                        <p className="text-sm opacity-90">Chat with us instantly</p>
                      </div>
                    </a>
                    <a
                      href="tel:+15551234567"
                      className="flex items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-3" />
                      <div>
                        <p className="font-semibold">Call Now</p>
                        <p className="text-sm opacity-90">+1 (555) 123-4567</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="flex items-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Facebook className="h-5 w-5 mr-2" />
                      Facebook
                    </a>
                    <a href="#" className="flex items-center p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                      <Twitter className="h-5 w-5 mr-2" />
                      Twitter
                    </a>
                    <a href="#" className="flex items-center p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                      <Instagram className="h-5 w-5 mr-2" />
                      Instagram
                    </a>
                    <a href="#" className="flex items-center p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Youtube className="h-5 w-5 mr-2" />
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Department Contacts</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Direct contact information for specific departments
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-900 mb-2">{dept.name}</h3>
                  <a
                    href={`mailto:${dept.email}`}
                    className="text-green-600 hover:text-green-700 text-sm flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
