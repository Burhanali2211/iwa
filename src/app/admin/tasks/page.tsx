'use client';

import { useState } from 'react';
import { Plus, GripVertical, X, Edit, Trash2, Calendar, User } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

// Interfaces for data structure
interface Task {
  id: string;
  content: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

// Initial Data
const initialColumns: Column[] = [
    { 
      id: 'todo', 
      title: 'To-Do', 
      tasks: [
        { id: '1', content: 'Design new dashboard layout', description: 'Create wireframes and mockups', priority: 'high' },
        { id: '2', content: 'Develop API for user stats', description: 'Implement REST endpoints', priority: 'medium' }
      ] 
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      tasks: [
        { id: '3', content: 'Implement dark mode theme', description: 'Add theme switching functionality', priority: 'high' }
      ] 
    },
    { 
      id: 'done', 
      title: 'Done', 
      tasks: [
        { id: '4', content: 'Fix login page bug', description: 'Resolve authentication issues', priority: 'medium' },
        { id: '5', content: 'Update README documentation', description: 'Improve project documentation', priority: 'low' }
      ] 
    },
];

// Task Card Component
const TaskCard = ({ task, onEdit, onDelete }: { task: Task; onEdit?: (task: Task) => void; onDelete?: (taskId: string) => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
    const style = { transform: CSS.Transform.toString(transform), transition };
    
    const getPriorityColor = (priority?: string) => {
      switch (priority) {
        case 'high': return 'border-l-red-500';
        case 'medium': return 'border-l-yellow-500';
        case 'low': return 'border-l-green-500';
        default: return 'border-l-gray-300';
      }
    };

    return (
        <div 
          ref={setNodeRef} 
          style={style} 
          {...attributes} 
          {...listeners} 
          className={`bg-background p-4 rounded-lg shadow mb-3 border-l-4 ${getPriorityColor(task.priority)} hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium text-foreground">{task.content}</p>
              {task.description && (
                <p className="text-sm text-text-secondary mt-1">{task.description}</p>
              )}
              <div className="flex items-center gap-4 mt-2 text-xs text-text-muted">
                {task.assignee && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{task.assignee}</span>
                  </div>
                )}
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                  </div>
                )}
                {task.priority && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {task.priority}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <GripVertical className="h-4 w-4 text-text-muted" />
              {onEdit && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Edit className="h-3 w-3 text-text-muted" />
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 className="h-3 w-3 text-red-500" />
                </button>
              )}
            </div>
          </div>
        </div>
    )
}

// Column Component
const Column = ({ column, onEditTask, onDeleteTask }: { column: Column; onEditTask?: (task: Task) => void; onDeleteTask?: (taskId: string) => void }) => {
     return (
        <div className="bg-surface p-4 rounded-2xl shadow-md w-80 flex-shrink-0">
            <h3 className="text-lg font-semibold text-foreground mb-4">{column.title} ({column.tasks.length})</h3>
            <SortableContext items={column.tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                {column.tasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                  />
                ))}
            </SortableContext>
        </div>
    )
}

// Add/Edit Task Modal
const TaskModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  task, 
  mode 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (task: Omit<Task, 'id'>) => void; 
  task?: Task; 
  mode: 'add' | 'edit' 
}) => {
  const [formData, setFormData] = useState({
    content: task?.content || '',
    description: task?.description || '',
    assignee: task?.assignee || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      toast.error('Task content is required');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface p-6 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {mode === 'add' ? 'Add New Task' : 'Edit Task'}
          </h3>
          <button onClick={onClose} className="text-text-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Task Title *</label>
            <input
              type="text"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter task title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Assignee</label>
            <input
              type="text"
              value={formData.assignee}
              onChange={(e) => setFormData({...formData, assignee: e.target.value})}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter assignee name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Due Date</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {mode === 'add' ? 'Add Task' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function TasksPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
        setColumns(items => {
            const activeContainerIndex = items.findIndex(col => col.tasks.some(t => t.id === active.id));
            const overContainerIndex = items.findIndex(col => col.tasks.some(t => t.id === over.id) || col.id === over.id);

            if (activeContainerIndex === -1 || overContainerIndex === -1) return items;

            const newItems = [...items];
            const activeColumn = newItems[activeContainerIndex];
            const overColumn = newItems[overContainerIndex];

            const activeTaskIndex = activeColumn.tasks.findIndex(t => t.id === active.id);
            const overTaskIndex = overColumn.tasks.findIndex(t => t.id === over.id);

            if (activeContainerIndex === overContainerIndex) { // Move within the same column
                activeColumn.tasks = arrayMove(activeColumn.tasks, activeTaskIndex, overTaskIndex);
            } else { // Move to a different column
                const [movedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);
                const newIndex = overTaskIndex >= 0 ? overTaskIndex : overColumn.tasks.length;
                overColumn.tasks.splice(newIndex, 0, movedTask);
            }
            return newItems;
        });
        toast.success('Task moved successfully!');
    }
  };

  const handleAddTask = () => {
    setModalMode('add');
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task: Task) => {
    setModalMode('edit');
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setColumns(prev => prev.map(col => ({
        ...col,
        tasks: col.tasks.filter(task => task.id !== taskId)
      })));
      toast.success('Task deleted successfully!');
    }
  };

  const handleSubmitTask = (taskData: Omit<Task, 'id'>) => {
    if (modalMode === 'add') {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData
      };
      setColumns(prev => prev.map(col => 
        col.id === 'todo' 
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      ));
      toast.success('Task added successfully!');
    } else if (editingTask) {
      setColumns(prev => prev.map(col => ({
        ...col,
        tasks: col.tasks.map(task => 
          task.id === editingTask.id 
            ? { ...task, ...taskData }
            : task
        )
      })));
      toast.success('Task updated successfully!');
    }
  };
  
  const activeTask = activeId ? columns.flatMap(col => col.tasks).find(t => t.id === activeId) : null;

  return (
    <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Task Board</h1>
                <p className="text-text-secondary">Organize and manage your projects.</p>
            </div>
            <button 
              onClick={handleAddTask}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
                <Plus className="h-5 w-5" />
                Add Task
            </button>
        </div>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex gap-6 overflow-x-auto pb-4">
                <SortableContext items={columns.map(c => c.id)} strategy={rectSortingStrategy}>
                    {columns.map(column => (
                      <Column 
                        key={column.id} 
                        column={column} 
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                      />
                    ))}
                </SortableContext>
            </div>
            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>
        </DndContext>

        <TaskModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitTask}
          task={editingTask}
          mode={modalMode}
        />
    </div>
  );
} 