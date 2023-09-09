'use client'


import {useEffect, useState} from "react";
import {WorkspaceCard} from "@/components/composite/WorkspaceCard";
import {WorkspaceDTO} from "@/types/WorkspaceDTO";
import axios from "axios";
import {Button, TextField} from "@mui/material";
import Stack from "@mui/material/Stack";
import {TaskDTO} from "@/types/TaskDTO";
import {TaskCard} from "@/components/composite/TaskCard";

export const Dashboard = () => {
    const [workspaces, setWorkspaces] = useState<WorkspaceDTO[]>([])
    const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(true)
    const [newWorkspaceName, setNewWorkspaceName] = useState("");
    const [newWorkspaceDescription, setNewWorkspaceDescription] = useState("");

    const [tasks, setTasks] = useState<TaskDTO[]>([])
    const [isTaskLoading, setIsTaskLoading] = useState(true)

    useEffect(() => {
        axios.get<WorkspaceDTO[]>("/api/workspaces").then((res) => {
            setWorkspaces(res.data)
            setIsWorkspaceLoading(false)
        })
    }, []);

    useEffect(() => {
        axios.get<TaskDTO[]>("/api/tasks").then((res) => {
            setTasks(res.data)
            setIsTaskLoading(false)
        })
    }, [])

    return <Stack spacing={"20px"} direction={'row'}>
        <Stack direction={'column'}>
            <Stack  width={"400px"} padding={"20px"}>
                <TextField fullWidth={true} placeholder={"New workspace name"} value={newWorkspaceName} onChange={(e) => {
                    setNewWorkspaceName(e.target.value)
                }}/>
                <TextField fullWidth={true} placeholder={"New workspace description"} value={newWorkspaceDescription} onChange={(e) => {
                    setNewWorkspaceDescription(e.target.value)
                }}/>
                <Button onClick={async () => {
                    await axios.post("/api/workspaces", {
                        name: newWorkspaceName,
                        description: newWorkspaceDescription
                    })
                    window.location.reload()
                }} disabled={!newWorkspaceName}>
                    Create
                </Button>
            </Stack>
            {
                isWorkspaceLoading ? <div>Loading...</div> : workspaces.map((workspace) => {
                    return <WorkspaceCard key={workspace.id} {...workspace} />
                })
            }
        </Stack>
        <Stack direction={'column'}>
            {
                isTaskLoading ? <div>Loading...</div> : tasks.length ? tasks.map((task) => {
                    return <TaskCard key={task.id} {...task} />
                }) : <div>No tasks</div>
            }
        </Stack>
    </Stack>
}