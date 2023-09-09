import { Container, Box } from "@mui/material";
export const WorkspaceSidebar = ({workspaces}: {
    workspaces: string[]
}) => {
    return (
        <>
          <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />
          </Container>
        </>
      );
}