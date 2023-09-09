import {useContext} from "react";
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import axios from "axios";

export const useWorkspaces = () => {
    const {setWorkspace, workspaces, workspace, setChannel, channels} = useContext(WorkspaceContext);
    const selectWorkspace = (id:string) => {
        setWorkspace(workspaces.find((w:any) => w.workspace.id === id)?.workspace)
    }
    const selectChannel = (id:string) => {
        setChannel(channels.find((c:any) => c.id === id))
    }
    const createWorkspace = async (name:string) => {
        await axios.post('/api/workspace', {name})
    }

    const createChannel = async (name:string) => {
        await axios.post(`/api/workspace/${workspace.id}/channel`, {name})
    }

    return {selectWorkspace, createWorkspace, createChannel, selectChannel};
}