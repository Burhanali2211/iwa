'use client';

import { useState } from 'react';
import { Plus, X, Calendar, Users, Target } from 'lucide-react';
import { ComponentType } from 'react';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  name: string;
  dueDate: string;
  Icon: ComponentType<{ className?: string }>;
  iconBgColor: string;
  description?: string;
  team?: string[];
  priority?: 'low' | 'medium' | 'high';
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Develop API Endpoints', dueDate: 'Nov 28, 2024', Icon: () => <span>🚀</span>, iconBgColor: 'bg-blue-100', description: 'Create RESTful API endpoints for user management', priority: 'high' },
    { id: '2', name: 'Onboarding Flow', dueDate: 'Nov 28, 2024', Icon: () => <span>👋</span>, iconBgColor: 'bg-green-100', description: 'Design and implement new user onboarding process', priority: 'medium' },
    { id: '3', name: 'Build Dashboard', dueDate: 'Nov 30, 2024', Icon: () => <span>📊</span>, iconBgColor: 'bg-yellow-100', description: 'Create comprehensive admin dashboard', priority: 'high' },
    { id: '4', name: 'Optimize Page Load', dueDate: 'Dec 5, 2024', Icon: () => <span>⚡️</span>, iconBgColor: 'bg-purple-100', description: 'Improve website performance and loading times', priority: 'medium' },
    { id: '5', name: 'Cross-Browser Testing', dueDate: 'Dec 8, 2024', Icon: () => <span>🌐</span>, iconBgColor: 'bg-pink-100', description: 'Ensure compatibility across all major browsers', priority: 'low' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    dueDate: '',
    description: '',
    priority: 'medium' as const
  });

  const iconOptions = [
    { icon: '🚀', bgColor: 'bg-blue-100', label: 'Development' },
    { icon: '👋', bgColor: 'bg-green-100', label: 'Onboarding' },
    { icon: '📊', bgColor: 'bg-yellow-100', label: 'Dashboard' },
    { icon: '⚡️', bgColor: 'bg-purple-100', label: 'Performance' },
    { icon: '🌐', bgColor: 'bg-pink-100', label: 'Testing' },
    { icon: '🎨', bgColor: 'bg-indigo-100', label: 'Design' },
  ];

  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name || !newProject.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      dueDate: newProject.dueDate,
      description: newProject.description,
      priority: newProject.priority,
      Icon: () => <span>{selectedIcon.icon}</span>,
      iconBgColor: selectedIcon.bgColor,
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', dueDate: '', description: '', priority: 'medium' });
    setShowModal(false);
    toast.success('Project created successfully!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive bg-destructive/20';
      case 'medium': return 'text-warning bg-warning/20';
      case 'low': return 'text-success bg-success/20';
      default: return 'text-text-secondary bg-background';
    }
  };

  return (
    <>
      <div className="bg-surface p-6 rounded-lg shadow-card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">Projects</h3>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-sm text-text-secondary border border-border hover:bg-background px-3 py-1.5 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center p-3 hover:bg-background rounded-lg transition-colors cursor-pointer">
              <div className={`p-2 rounded-lg ${project.iconBgColor}`}>
                <project.Icon className="h-5 w-5" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{project.name}</p>
                  {project.priority && (
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm text-text-secondary mt-1">{project.description}</p>
                )}
                <p className="text-sm text-text-muted mt-1">Due: {project.dueDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Create New Project</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Project Name *</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Icon</label>
                <div className="grid grid-cols-3 gap-2">
                  {iconOptions.map((option) => (
                    <button
                      key={option.icon}
                      type="button"
                      onClick={() => setSelectedIcon(option)}
                      className={`p-3 rounded-md border-2 transition-colors ${
                        selectedIcon.icon === option.icon 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <p className="text-xs mt-1">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Due Date *</label>
                <input
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter project description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
                <select
                  value={newProject.priority}
                  onChange={(e) => setNewProject({...newProject, priority: e.target.value as any})}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-md text-text-secondary hover:bg-background transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectList; 