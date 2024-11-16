import { create } from 'zustand';
import { projectApi, Project } from '../api/projectApi';

interface ProjectStore {
  projects: Project[];
  selectedProject: Project | null;
  showModal: boolean;
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  setSelectedProject: (project: Project) => void;
  updateProjectData: (path: string, data: Record<string, unknown>) => Promise<void>;
  setShowModal: (show: boolean) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProject: null,
  showModal: false,
  loading: false,
  error: null,
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await projectApi.getProjects();
      set({ projects, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', loading: false });
    }
  },
  setSelectedProject: (project) => set({ selectedProject: project }),
  updateProjectData: async (path, data) => {
    set({ loading: true, error: null });
    try {
      const updatedProject = await projectApi.updateProjectData(path, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p.path === path ? updatedProject : p
        ),
        selectedProject: state.selectedProject?.path === path
          ? updatedProject
          : state.selectedProject,
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update project', loading: false });
    }
  },
  setShowModal: (show) => set({ showModal: show }),
}));