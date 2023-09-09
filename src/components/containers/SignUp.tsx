'use client'

import {useState} from "react";
import axios from "axios";
import {Button, Container, TextField} from "@mui/material";

export const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const handleSubmit = async () => {
        await axios.post('/api/user/signup', {
            email,
            name,
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
                value={name}
                onChange={e => setName(e.target.value)}
                label="Name"
                variant="outlined"
                sx={{
                    width: '40%',
                    minWidth: '300px',
                    marginY: '10px'
                }}
            />
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
            <Button onClick={()=>{
                window.location.href = '/auth/signin'
            }}>
                Already having account?
            </Button>
        </Container>
    );
}
