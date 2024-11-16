import React from 'react';
import {  FileJson } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';

const FileList: React.FC = () => {
  const { selectedProject, setShowModal } = useProjectStore();

  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Sélectionnez un projet pour voir ses fichiers
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {selectedProject.name}
      </h2>
      <div className="grid grid-cols-1 gap-2">
        <div
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <FileJson className="w-5 h-5 text-indigo-600" />
          <span className="text-sm text-gray-700">.data.json</span>
        </div>
      </div>
    </div>
  );
}

export default FileList;