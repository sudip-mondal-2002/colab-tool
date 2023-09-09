import {Button, TextField} from "@mui/material";
import Stack from '@mui/material/Stack';
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import {useContext, useState} from "react";
import {useWorkspaces} from "@/hooks/workspaces";

export const ChannelSidebar = () => {
    const {channels, isChannelLoaded} = useContext(WorkspaceContext)
    const {createChannel, selectChannel} = useWorkspaces()
    const [newChannelName, setNewChannelName] = useState<string>("");
    return (
        <>
            <Stack
                width={"29%"}
                height={"100vh"}
                marginX={"10px"}
            >
                <TextField placeholder={"New Channel Name"} value={newChannelName} onChange={(e) => setNewChannelName(e.target.value)}/>
                <Button disabled={!newChannelName} variant="contained" style={{margin: "10px", padding: "10px 20px"}} onClick={async ()=>{
                    createChannel(newChannelName)
                    window.location.reload()
                }}>Create Channel</Button>
                {
                    !isChannelLoaded && <p>Loading...</p>
                }
                {
                    isChannelLoaded && channels?.map((channel: any) => {
                        return (
                            <Button
                                key={channel.id}
                                style={{
                                    margin: "10px",
                                    padding: "10px 20px"
                                }}
                                onClick={() => selectChannel(channel.id)}
                            >
                                {channel.name}
                            </Button>
                        )
                    })
                }

            </Stack>

        </>
    );
}
