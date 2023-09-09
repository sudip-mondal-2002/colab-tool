'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import { WorkspaceSidebar } from "../composite/WorkspaceSidebar";
import {Container, Skeleton, Stack} from "@mui/material";

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [workspaces, setWorkspaces] = useState<{
        id: string,
        name: string
    }[]>([{
        id: '2',
        name: 'test'
    },{
        id: '3',
        name: 'test2'
    }])
    useEffect(() => {
        axios.get('/api/workspace').then(()=>{
            setLoading(false);
        })
    }, []);
    return <>
        {
            loading ? <Container maxWidth={false} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh'
            }}>
                <Stack width={"29%"} height={"100%"} spacing={2} >
                    {Array.from({length:10}).map((_, index)=><Skeleton key={index} variant="rectangular" width={"100%"} height={"50px"} />)}
                </Stack>
                <Skeleton variant="rectangular" width={"69%"} height={"100%"} />
            </Container> : <WorkspaceSidebar workspaces={workspaces} />
        }
    </>
}