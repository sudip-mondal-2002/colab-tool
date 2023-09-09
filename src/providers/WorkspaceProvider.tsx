'use client'
import {ReactNode, useEffect, useState, createContext} from "react";
import axios from "axios";

export const WorkspaceContext = createContext<any>({});

export const WorkspaceProvider = ({children}: {
    children: ReactNode
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isChannelLoaded, setIsChannelLoaded] = useState(false);
    const [workspaces, setWorkspaces] = useState<any[]>([]);
    const [channels, setChannels] = useState<any[]>([]);
    const [workspace, setWorkspace] = useState<any>(null);
    const [channel, setChannel] = useState<any>(null);
    const [tasks, setTasks] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/workspace').then(({data}) => {
            setWorkspaces(data);
            setIsLoaded(true);
        });
    }, []);

    useEffect(() => {
        setIsChannelLoaded(true);
    }, [channels]);

    useEffect(() => {
        if (!workspace){
            setChannels([]);
            setChannel(null)
            return;
        }
        setIsChannelLoaded(false)
        axios.get(`/api/workspace/${workspace.id}/channel`).then(({data}) => {
            setChannels(data);
        });
    }, [workspace]);

    useEffect(() => {
        if(!workspace){
            axios.get('/api/tasks').then(({data}) => {
                setTasks(data);
            });

        }else if(!channel){
            axios.get(`/api/workspace/${workspace.id}/tasks`).then(({data}) => {
                setTasks(data);
            });
        } else {
            setTasks([])
        }
    },[workspace, channel])

    return (
        <WorkspaceContext.Provider value={{
            isLoaded,
            workspaces,
            channels,
            workspace,
            channel,
            tasks,
            isChannelLoaded,
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