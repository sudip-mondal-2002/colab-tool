import { Container, Box, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import {useContext} from "react";

export const WorkspaceSidebar = () => {
    const {workspaces} = useContext(WorkspaceContext)
    console.log(workspaces)
    return (
        <>
          <Stack 
    width={"29%"}
    height={"100%"}
    style={{
    display: "flex",
    flexWrap: "wrap" 
          }}
>
    <Button variant="contained" style={{margin: "10px", padding: "10px 20px"}}>Create Workspace</Button>
  {
    workspaces?.map((workspace:any) => {
      return (
        <Button 
          key={workspace.workspace.id}
          style={{
            margin: "10px", 
            padding: "10px 20px"
          }}
        >
          {workspace.workspace.name}
        </Button>
      )
    })
  }

</Stack>

        </>
      );
}
