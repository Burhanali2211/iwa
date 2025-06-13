import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Users, Target, Heart, Award, BookOpen, Building2 } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Shabir Ahmad",
      role: "Chairman",
      image: "/api/placeholder/200/200",
      description: "Leading the organization with dedication and commitment to spreading authentic Islamic knowledge and maintaining the vision of our founder."
    },
    {
      name: "Bashir Ahmad",
      role: "Finance Manager",
      image: "/api/placeholder/200/200",
      description: "Managing the financial affairs of the organization and ensuring transparent and effective use of resources for our mission."
    },
    {
      name: "Irfan Hussain",
      role: "Supervisor",
      image: "/api/placeholder/200/200",
      description: "Overseeing daily operations and ensuring the smooth functioning of all programs and activities at Idarah Wali Ul Aser."
    },
    {
      name: "Mudasir Ahmad",
      role: "Organizer",
      image: "/api/placeholder/200/200",
      description: "Coordinating events, programs, and community activities to engage and educate our community members."
    },
    {
      name: "Showkat Ahmad",
      role: "Secretary",
      image: "/api/placeholder/200/200",
      description: "Managing administrative affairs and maintaining records and documentation for the organization."
    },
    {
      name: "Yawar Abbas",
      role: "Media Consultant",
      image: "/api/placeholder/200/200",
      description: "Handling media relations and communications to spread our message and connect with the broader community."
    },
    {
      name: "Bilal Ahmad",
      role: "Social Media Manager",
      image: "/api/placeholder/200/200",
      description: "Managing our digital presence and social media platforms to reach and engage with our online community."
    },
    {
      name: "Zeeshan",
      role: "Media Incharge",
      image: "/api/placeholder/200/200",
      description: "Responsible for media production, documentation of events, and maintaining our digital archives."
    }
  ];

  const values = [
    {
      icon: BookOpen,
      title: "Authentic Islamic Knowledge",
      description: "We are committed to spreading authentic Islamic knowledge and the true teachings of Imam Hussain A.S and his sacrifices on the Holy Land of Karbala."
    },
    {
      icon: Heart,
      title: "Building Taqwa",
      description: "Our primary focus is on building Taqwa (God-consciousness) in our students and community members through proper Islamic education."
    },
    {
      icon: Target,
      title: "Mission of Sayyed Mustafa Hamadani",
      description: "We continue the noble mission of our founder to bring light of knowledge to people and enlighten them with true Islamic teachings."
    },
    {
      icon: Users,
      title: "Community Service",
      description: "Located in Banpora Chattergam Kashmir, we serve our local community while reaching out to students and families across the region."
    }
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
                About Idarah Wali Ul Aser
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Religious Organisation in Chattergam Kashmir - Bringing light of knowledge to people since 2005
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-green-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <Building2 className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To bring light of knowledge to people and enlighten them with the true knowledge of
                  Imam Hussain A.S and his true aim of sacrifices on the Holy Land of Karbala. We are
                  committed to providing authentic Islamic education through our library and Maktab
                  Wali Ul Aser, fostering spiritual growth and building Taqwa in our community.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-xl">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To continue the mission of Sayyed Mustafa Hamadani by creating a center of authentic
                  Islamic knowledge that serves the community of Chattergam Kashmir and beyond. We aim
                  to bring innovative and authentic Islamic knowledge while boosting the interests of
                  Gen-Z and Gen-X students in Islamic teachings and values.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our History</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A journey that began with the vision of Aga Syed Mustafa Al Hussaini Al Hamadani
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/api/placeholder/600/400"
                  alt="Idarah Wali Ul Aser building"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2005 - Foundation</h3>
                  <p className="text-gray-700">
                    Idarah Wali Ul Aser was founded by Aga Syed Mustafa Al Hussaini Al Hamadani as a
                    Library with the intention to bring light of knowledge to people.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maktab Wali Ul Aser</h3>
                  <p className="text-gray-700">
                    We are also running school Maktab Wali Ul Aser located in Banpora Chattergam 191113
                    Kashmir, focusing on building Taqwa and authentic Islamic knowledge.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Community Management</h3>
                  <p className="text-gray-700">
                    Currently managed by a dedicated group of people who continue the mission of
                    spreading authentic Islamic knowledge and the teachings of Imam Hussain A.S.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Approach</h3>
                  <p className="text-gray-700">
                    Our institute works on bringing innovative and authentic Islamic knowledge while
                    holding new competitions to boost interests of Gen-Z and Gen-X students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do and shape our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated team members who manage and operate Idarah Wali Ul Aser
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-semibold mb-3 text-sm">{member.role}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Continuing the mission of bringing light of knowledge to our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Since 2005</h3>
                <p className="text-gray-600">Nearly two decades of serving the community</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Community Service</h3>
                <p className="text-gray-600">Serving Chattergam Kashmir and surrounding areas</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Library & Education</h3>
                <p className="text-gray-600">Comprehensive library and Maktab Wali Ul Aser</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Authentic Knowledge</h3>
                <p className="text-gray-600">Teaching true knowledge of Imam Hussain A.S</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
