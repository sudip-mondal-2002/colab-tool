import {Button, TextField} from "@mui/material";
import Stack from '@mui/material/Stack';
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import {useContext, useState} from "react";
import {useWorkspaces} from "@/hooks/workspaces";
import {UserRole} from "@prisma/client";
import axios from "axios";

export const WorkspaceSidebar = () => {
    const {workspaces} = useContext(WorkspaceContext)
    const {selectWorkspace, createWorkspace} = useWorkspaces()
    const [newWorkspaceName, setNewWorkspaceName] = useState("");
    return (
        <>
            <Stack
                width={"29%"}
                height={"100vh"}
            >
                <TextField value={newWorkspaceName} placeholder={"Create new"}
                           onChange={(e) => setNewWorkspaceName(e.target.value)}/>
                <Button onClick={async () => {
                    createWorkspace(newWorkspaceName)
                    window.location.reload()
                }} disabled={!newWorkspaceName} variant="contained"
                        style={{margin: "10px", padding: "10px 20px"}}> Create Workspace</Button>
                {
                    workspaces?.map((workspace: any) => {
                        return (
                            <Stack key={workspace.workspaceId} direction={'row'} justifyContent={"flex-end"} >
                                <Button
                                    style={{
                                        margin: "10px",
                                        padding: "10px 20px"
                                    }}
                                    onClick={() => selectWorkspace(workspace.workspaceId)}
                                >
                                    {workspace.workspace.name}
                                </Button>
                                {/*<Button disabled={workspace.role !== UserRole.ADMIN && workspace.role !== UserRole.OWNER } >Edit</Button>*/}
                                <Button disabled={workspace.role !== UserRole.OWNER} onClick={async ()=>{
                                    axios.delete(`/api/workspace/${workspace.workspaceId}`)
                                    window.location.reload()
                                }} >Delete</Button>
                            </Stack>
                        )
                    })
                }

            </Stack>

        </>
    )
        ;
}
