import { Container, Box, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import {useContext} from "react";

export const WorkspaceSidebar = () => {
    const {workspaces} = useContext(WorkspaceContext)
    return (
        <>
          <Stack width={"29%"} height={"100%"}>
            {
                workspaces.map((workspace:any) => {
                    return <Button key={workspace.id}>{workspace.name}</Button>
                })
            }
        
          </Stack>
        </>
      );
}
