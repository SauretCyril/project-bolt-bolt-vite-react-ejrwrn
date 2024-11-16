import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface Project {
  path: string;
  name: string;
  data: Record<string, unknown>;
}

export const projectApi = {
  async getProjects(): Promise<Project[]> {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  },

  async updateProjectData(path: string, data: Record<string, unknown>): Promise<Project> {
    const response = await axios.put(`${API_URL}/projects/${encodeURIComponent(path)}`, { data });
    return response.data;
  }
};