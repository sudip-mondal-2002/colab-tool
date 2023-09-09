'use client'
import {useContext} from "react";
import {WorkspaceSidebar} from "../composite/WorkspaceSidebar";
import {Container, Skeleton, Stack} from "@mui/material";
import {WorkspaceContext} from "@/providers/WorkspaceProvider";
import {ChannelSidebar} from "@/components/composite/ChannelSidebar";

export const Dashboard = () => {

    const {workspaces, workspace, tasks, channel, isLoaded} = useContext(WorkspaceContext)
    return <>
        {
            !isLoaded && <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh'
            }}>
                <Stack width={"29%"} height={"100%"} spacing={2}>
                    {Array.from({length: 10}).map((_, index) => <Skeleton key={index} variant="rectangular" width={"100%"}
                                                                          height={"50px"}/>)}
                </Stack>
                <Skeleton variant="rectangular" width={"69%"} height={"100%"}/>
            </Container>
        }
        <Container
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
            {
                isLoaded && <WorkspaceSidebar/>
            }
            {
                workspace && <ChannelSidebar/>
            }
            {
                tasks?.length? <></>: null
            }
            {
                channel && <></>
            }
        </Container>
    </>
}