'use client'
import {useEffect, useState} from "react";
import axios from "axios";

export const Dashboard = () => {
    const [workspaces, setWorkspaces] = useState<{
        id: string,
        name: string
    }[]>([{
        id: '1',
        name: 'test'
    },{
        id: '2',
        name: 'test2'
    }])
    useEffect(() => {
        axios.get('/api/workspace').then(console.log)
    }, []);
    return <></>;
}