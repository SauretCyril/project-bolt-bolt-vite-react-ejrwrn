import React, { useEffect } from 'react';
import { Folder, AlertCircle, Loader2 } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';

const ProjectTree: React.FC = () => {
  const { projects, selectedProject, setSelectedProject, loading, error, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 flex items-center space-x-2">
        <AlertCircle className="w-5 h-5" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Projets</h2>
      </div>
      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.path}
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${
              selectedProject?.path === project.path
                ? 'bg-indigo-50 text-indigo-600'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <Folder className="w-4 h-4" />
            <span className="text-sm truncate">{project.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectTree;