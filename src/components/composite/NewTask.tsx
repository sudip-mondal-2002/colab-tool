import {useEffect, useState} from "react";
import {TaskPriority, TaskStatus} from ".prisma/client";
import {Button, Container, MenuItem, Select, TextField} from "@mui/material";
import axios from "axios";
import {UserDTO} from "@/types/UserDTO";

export const NewTask = ({workspaceId}: {
    workspaceId: string
}) => {
    const [newTaskName, setNewTaskName] = useState<string>("")
    const [newTaskDescription, setNewTaskDescription] = useState<string>("")
    const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>(TaskPriority.LOW)
    const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>(TaskStatus.TODO)
    const [newTaskUserEmail, setNewTaskUserEmail] = useState<string>("")
    const [users, setUsers] = useState<string[]>([])

    useEffect(() => {
        axios.get<UserDTO[]>(`/api/workspaces/${workspaceId}/user`).then((res) => {
            setUsers(res.data.map((user) => user.email))
        })
    }, [workspaceId]);

    return <Container sx={{
        display: "flex",
        flexDirection: "column",
    }}>
        <TextField value={newTaskName} onChange={(e) => {
            setNewTaskName(e.target.value)
        }} placeholder={"Task name"}/>
        <TextField value={newTaskDescription} onChange={(e) => {
            setNewTaskDescription(e.target.value)
        }} placeholder={"Task description"}/>
        <Select value={newTaskPriority} onChange={(e) => {
            setNewTaskPriority(e.target.value as TaskPriority)
        }}>
            <MenuItem value={TaskPriority.LOW}>Low</MenuItem>
            <MenuItem value={TaskPriority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={TaskPriority.HIGH}>High</MenuItem>
        </Select>
        <Select value={newTaskStatus} onChange={(e) => {
            setNewTaskStatus(e.target.value as TaskStatus)
        }}>
            <MenuItem value={TaskStatus.TODO}>TODO</MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>IN_PROGRESS</MenuItem>
            <MenuItem value={TaskStatus.DONE}>DONE</MenuItem>
        </Select>
        <Select value={newTaskUserEmail} onChange={(e) => {
            setNewTaskUserEmail(e.target.value as string)
        }}>
            {
                users.map((user) => {
                    return <MenuItem key={user} value={user}>{user}</MenuItem>
                })
            }
        </Select>
        <Button onClick={()=>{
            axios.post(`/api/workspaces/${workspaceId}/tasks`, {
                name: newTaskName,
                description: newTaskDescription,
                priority: newTaskPriority,
                status: newTaskStatus,
                userEmail: newTaskUserEmail
            }).then(() => {
                window.location.reload()
            })
        }}>Create new Task</Button>
    </Container>
}