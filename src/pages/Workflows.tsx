import { useState } from 'react';
import { useStore } from '@/store';
import { CheckCircle2, Clock, AlertCircle, Plus, Filter, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Workflows() {
  const tasks = useStore(state => state.tasks);
  const projects = useStore(state => state.projects);
  const updateTaskStatus = useStore(state => state.updateTaskStatus);

  const [filter, setFilter] = useState<'all' | 'my' | 'overdue'>('my');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'my') return task.assignedTo === 'Martin';
    if (filter === 'overdue') return new Date(task.dueDate) < new Date() && task.status !== 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 border-b border-[#EAEDF3] bg-[#FFFFFF] px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Productivity & Workflow</h1>
            <p className="text-sm text-gray-500 mt-1">Manage tasks, approvals, and automated reminders.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>

        <div className="flex space-x-6 border-b border-[#EAEDF3]">
          <button
            onClick={() => setFilter('my')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              filter === 'my' 
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
            )}
          >
            <CheckCircle2 className="w-4 h-4" />
            My Tasks
          </button>
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              filter === 'all' 
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
            )}
          >
            <Clock className="w-4 h-4" />
            All Tasks
          </button>
          <button
            onClick={() => setFilter('overdue')}
            className={cn(
              "pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              filter === 'overdue' 
                ? "border-emerald-500 text-emerald-600"
                : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
            )}
          >
            <AlertCircle className="w-4 h-4" />
            Overdue
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="bg-[#FFFFFF] border border-[#EAEDF3] rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#EAEDF3] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Task List</h3>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EAEDF3] border border-[#D4D8E2] rounded-lg text-xs font-medium text-gray-600 hover:bg-[#D4D8E2] transition-colors">
                <Filter className="w-3.5 h-3.5" />
                Filter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-neutral-400 uppercase bg-[#F8FAFB] border-b border-[#EAEDF3]">
                <tr>
                  <th className="px-6 py-4 font-medium w-12"></th>
                  <th className="px-6 py-4 font-medium">Task</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Due Date</th>
                  <th className="px-6 py-4 font-medium">Priority</th>
                  <th className="px-6 py-4 font-medium">Assignee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEDF3]">
                {filteredTasks.map((task) => {
                  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';
                  
                  return (
                    <tr key={task.id} className={cn(
                      "hover:bg-[#F0F2F6] transition-colors group",
                      task.status === 'Completed' ? "opacity-50" : ""
                    )}>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => updateTaskStatus(task.id, task.status === 'Completed' ? 'To Do' : 'Completed')}
                          className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                            task.status === 'Completed' 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "border-[#D4D8E2] hover:border-emerald-500 group-hover:bg-[#EAEDF3]"
                          )}
                        >
                          {task.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <span className={task.status === 'Completed' ? "line-through text-gray-400" : ""}>
                          {task.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {projects.find(p => p.id === task.projectId)?.name || 'General'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-500" />
                          <span className={cn(
                            "font-mono",
                            isOverdue ? "text-red-500 font-medium" : "text-gray-600"
                          )}>
                            {task.dueDate}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded text-xs font-medium border",
                          task.priority === 'High' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          task.priority === 'Medium' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                          "bg-blue-500/10 text-blue-500 border-blue-500/20"
                        )}>
                          {task.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#EAEDF3] flex items-center justify-center border border-[#D4D8E2]">
                            <span className="text-[10px] font-medium text-gray-500">
                              {task.assignedTo.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-600">{task.assignedTo}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No tasks found matching the current filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
