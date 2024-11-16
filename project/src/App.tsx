
//import React from 'react';

import Split from 'react-split';
import {  Settings2 } from 'lucide-react';
import ProjectTree from './components/ProjectTree';
import FileList from './components/FileList';
import { useProjectStore } from './store/projectStore';
import ProjectModal from './components/ProjectModal';
function App() {
  const {  showModal, setShowModal } = useProjectStore();

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings2 className="w-6 h-6 text-indigo-600" />
            <h1 className="text-xl font-semibold text-gray-900">Gestionnaire de Projets</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Split 
        className="flex-1 flex"
        sizes={[25, 75]}
        minSize={200}
        gutterSize={8}
        gutterStyle={() => ({
          backgroundColor: '#f3f4f6',
          cursor: 'col-resize'
        })}
      >
        {/* Left Panel - Project Tree */}
        <div className="bg-white border-r border-gray-200 overflow-y-auto">
          <ProjectTree />
        </div>

        {/* Right Panel - File List */}
        <div className="bg-white overflow-y-auto p-6">
          <FileList />
        </div>
      </Split>

      {/* Project Modal */}
      {showModal && <ProjectModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default App;