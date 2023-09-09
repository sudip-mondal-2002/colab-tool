import {TaskDTO} from "@/types/TaskDTO";
import {Button, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {TaskPriority} from ".prisma/client";

export function TaskCard(
    {
        name,
        description,
        priority,
        status,
        id
    }: TaskDTO) {
    return (
        <Paper sx={{
            padding: "20px",
        }}>
            <Typography>{name}</Typography>
            <Typography>{description}</Typography>
            <Typography bgcolor={
                priority === TaskPriority.LOW ? "green" : priority === TaskPriority.MEDIUM ? "orange" : "red"
            }>{priority}</Typography>
            <Typography bgcolor={
                status === "TODO" ? "red" : status === "IN_PROGRESS" ? "blue" : "green"
            }>{status}</Typography>
            <Button onClick={() => {
                window.location.href = `/task/${id}`
            }}>Open</Button>
        </Paper>
    )
}


