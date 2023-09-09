'use client'

import {TaskDTO} from "@/types/TaskDTO";
import {useEffect, useState} from "react";
import {Button, Container, MenuItem, Select, TextField} from "@mui/material";
import {TaskCard} from "@/components/composite/TaskCard";
import Stack from "@mui/material/Stack";
import axios from "axios";
import {Role} from "@prisma/client";
import {WorkspaceDTO} from "@/types/WorkspaceDTO";
import {NewTask} from "@/components/composite/NewTask";

export const WorkspaceView = ({ workspaceId }: { workspaceId: string }) => {
    const [tasks, setTasks] = useState<TaskDTO[]>([])
    const [taskLoading, setTaskLoading] = useState<boolean>(false)
    const [role, setRole] = useState<Role>()
    const [files, setFiles] = useState<{
        id: string,
        name: string,
    }[]>([])
    const [fileLoading, setFileLoading] = useState<boolean>(false)

    useEffect(() => {
        setTaskLoading(true)
        axios.get<TaskDTO[]>(`/api/workspaces/${workspaceId}/tasks`)
            .then(res=> {
                setTasks(res.data)
                setTaskLoading(false)
            })
        axios.get<WorkspaceDTO>(`/api/workspaces/${workspaceId}`).then((res) => {
            setRole(res.data.role)
        })
        setFileLoading(true)
        axios.get<{
            id: string,
            name: string,
        }[]>(`/api/workspaces/${workspaceId}/files`).then((res) => {
            setFiles(res.data)
            setFileLoading(false)
        })
    }, [workspaceId]);

    return <Container sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }}>
        <Stack direction={'column'} sx={{
            width: "30%"
        }}>
            {
                role && (role === Role.OWNER || role === Role.ADMIN) && <NewTask workspaceId={workspaceId}/>
            }
            {
                taskLoading ? <div>Loading...</div> : tasks.length ? tasks.map((task) => {
                    return <TaskCard key={task.id} {...task} />
                }) : <div>No tasks</div>
            }
        </Stack>
        <Stack direction={'column'} sx={{
            width: "70%"
        }}>
            {
                role && (role === Role.OWNER || role === Role.ADMIN) && <AddUser workspaceId={workspaceId}/>
            }
            <AddFile workspaceId={workspaceId}/>
            {
                fileLoading ? <div>Loading...</div> : files.length ? files.map((file) => {
                    return <Container key={file.id} >
                        <a href={`/api/files/${file.id}`}>{file.name}</a>`
                    </Container>
                }): <div>No files</div>
            }
        </Stack>
    </Container>
}


const AddUser = ({workspaceId}: {workspaceId: string}) => {
    const [userEmail, setUserEmail] = useState<string>("")
    const [role, setRole] = useState<Role>(Role.USER)
    return <>
        <TextField value={userEmail} onChange={(e) => {
            setUserEmail(e.target.value)
        } } placeholder={"User email"}/>
        <Select value={role} onChange={(e) => {
            setRole(e.target.value as Role)
        }}>
            <MenuItem value={Role.USER}>User</MenuItem>
            <MenuItem value={Role.ADMIN}>Admin</MenuItem>
        </Select>
        <Button onClick={()=>{
            axios.post(`/api/workspaces/${workspaceId}/user/${userEmail}`, {
                role
            }).then(() => {
                window.location.reload()
            })
        }}>Add user</Button>
    </>
}

const AddFile = ({workspaceId}: {workspaceId: string}) => {
    const [file, setFile] = useState<File>()
    const [fileName, setFileName] = useState<string>("")
    return <>
        <TextField value={fileName} onChange={(e) => {
            setFileName(e.target.value)
        } } placeholder={"File name"}/>
        <input type={"file"} onChange={(e) => {
            setFile((e.target.files &&  e.target.files[0]) || undefined)
            if(!fileName){
                setFileName((e.target.files &&  e.target.files[0].name) || "")
            }
        }}/>
        <Button onClick={()=>{
            if(!file) return
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                axios.post(`/api/workspaces/${workspaceId}/files`, {
                    name: fileName,
                    content: fileReader.result
                }).then(() => {
                    window.location.reload()
                })
            }
        }}>Add file</Button>
    </>
}