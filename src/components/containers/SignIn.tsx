'use client'

import {FormEvent, useState} from "react";
import axios from "axios";
import {Button, Container, TextField} from "@mui/material";

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async () => {
        await axios.post('/api/user/signin', {
            email,
            password
        })
        window.location.href = '/'
    }
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }} >
            <TextField
                value={email}
                onChange={e => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                sx={{
                    width: '40%',
                    minWidth: '300px',
                    marginY: '10px'
                }}
            />
            <TextField
                value={password}
                onChange={e => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                sx={{
                    width: '40%',
                    minWidth: '300px',
                    marginY: '10px'
                }}
            />
            <Button onClick={handleSubmit} variant={"contained"} sx={{
                width: '40%',
                minWidth: '300px',
                marginY: '10px'
            }}>Submit</Button>
        </Container>
    );
}
