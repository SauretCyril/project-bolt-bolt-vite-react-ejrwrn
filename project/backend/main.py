from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
from typing import Dict, Any

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectData(BaseModel):
    data: Dict[str, Any]

def find_projects( : str = "."):
    projects = []
   
    for root, _, files in os.walk(start_path):
        if ".data.json" in files:
            path = os.path.abspath(root)
            name = os.path.basename(root)
            data_file = os.path.join(root, ".data.json")
            try:
                with open(data_file, "r", encoding='utf-8') as f:
                    data = json.load(f)
            except:
                data = {}
            projects.append({
                "path": path,
                "name": name,
                "data": data
            })
    return projects

@app.get("/projects")
async def get_projects():
    return find_projects()

@app.get("/root")
async def get_root():
    return {"root_directory": os.path.abspath(".")}

@app.put("/projects/{path:path}")
async def update_project(path: str, project_data: ProjectData):
    try:
        full_path = os.path.join(path, ".data.json")
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w", encoding='utf-8') as f:
            json.dump(project_data.data, f, indent=2)
        return {
            "path": path,
            "name": os.path.basename(path),
            "data": project_data.data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)