import {useContext} from "react";
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import axios from "axios";

export const useWorkspaces = () => {
    const {setWorkspace, workspaces, setWorkspaces} = useContext(WorkspaceContext);
    const selectWorkspace = (id:string) => {
        setWorkspace(workspaces.find((w:any) => w.workspace.id === id));
    }
    const createWorkspace = async (name:string) => {
        await axios.post('/api/workspaces', {name})
        await updateWorkspaces();
    }

    const updateWorkspaces = async () => {
        const {data} = await axios.get('/api/workspaces');
        setWorkspaces(data);
    }

    return {workspaces, selectWorkspace, createWorkspace, updateWorkspaces};
}