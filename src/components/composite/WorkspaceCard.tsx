import {Button, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {WorkspaceDTO} from "@/types/WorkspaceDTO";
import {Role} from "@prisma/client";

export const WorkspaceCard = ({name, description, role, id}: WorkspaceDTO ) => {
    return <Paper sx={{
        padding: "20px",
        width: "360px",
        maxWidth: "100%",
        margin: "20px"
    }}>
        <Typography variant={"h4"} >{name}</Typography>
        <Typography>{description}</Typography>
        <Button onClick={()=>{
            window.location.href = `/workspace/${id}`
        }}>Open</Button>
        <Button disabled={role === Role.ADMIN || role === Role.OWNER}>Edit</Button>
        <Button disabled={role === Role.OWNER}>Delete</Button>
    </Paper>
}