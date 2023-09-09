import { Container, Box, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import {useContext} from "react";
import { useWorkspaces } from "@/hooks/workspaces";

export const WorkspaceSidebar = () => {
    const {workspaces} = useContext(WorkspaceContext)
    const {selectWorkspace} = useWorkspaces()
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
          key={workspace.workspaceId}
          style={{
            margin: "10px", 
            padding: "10px 20px"
          }}
          onClick={() =>selectWorkspace(workspace.workspaceId)}
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
