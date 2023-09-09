import { Container, Box, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const WorkspaceSidebar = ({workspaces}: {
    workspaces: {
        id: string,
        name: string
    }[]
}) => {
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
  {
    workspaces.map((workspace) => {
      return (
        <Button 
          key={workspace.id}
          style={{
            margin: "10px", 
            padding: "10px 20px"
          }}
        >
          {workspace.name}
        </Button>
      )
    })
  }

</Stack>

        </>
      );
}
