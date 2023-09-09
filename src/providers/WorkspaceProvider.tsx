import {ReactNode, useEffect, useState, createContext} from "react";
import axios from "axios";

export const WorkspaceContext = createContext<any>(null);

export const WorkspaceProvider = ({children}: {
    children: ReactNode
}) => {
    const [workspaces, setWorkspaces] = useState([]);
    const [channels, setChannels] = useState([]);
    const [workspace, setWorkspace] = useState(null);
    const [channel, setChannel] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/api/workspace').then(({data}) => {
            setWorkspaces(data);
        });
    }, []);

    useEffect(() => {
        if (!workspace){
            setChannels([]);
            setChannel(null)
            return;
        }
        axios.get(`/api/workspace/${workspace}/channel`).then(({data}) => {
            setChannels(data);
        });
    }, [workspace]);

    useEffect(() => {
        if(!workspace){
            axios.get('/api/tasks').then(({data}) => {
                setTasks(data);
            });
        }else if(!channel){
            axios.get(`/api/workspace/${workspace}/task`).then(({data}) => {
                setTasks(data);
            });
        } else {
            setTasks([])
        }
    },[workspace, channel])

    return (
        <WorkspaceContext.Provider value={{
            workspaces,
            channels,
            workspace,
            channel,
            tasks,
            setWorkspaces,
            setChannels,
            setWorkspace,
            setChannel,
            setTasks,
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}