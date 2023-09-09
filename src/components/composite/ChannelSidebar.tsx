import { Container, Box, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import {useContext} from "react";

export const ChannelSidebar = () => {
    const {channels} = useContext(WorkspaceContext)
    console.log(channels)
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
    <Button variant="contained" style={{margin: "10px", padding: "10px 20px"}}>Channels</Button>
  {
    channels?.map((channel:any) => {
      return (
        <Button 
          key={channel.channel.id}
          style={{
            margin: "10px", 
            padding: "10px 20px"
          }}
        >
          {channel.channel.name}
        </Button>
      )
    })
  }

</Stack>

        </>
      );
}
