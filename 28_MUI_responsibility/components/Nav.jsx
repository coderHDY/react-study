import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box,
} from "@mui/material";

export default function Nav() {
    const computedClassName = ({ isActive }) => isActive ? 'active' : ''
    return (
        <Box
            sx={{
                width: "100%",
                height: 56,
                backgroundColor: 'primary.light',
                '&:hover': {
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <Box
                component="span"
                sx={{
                    display: {
                        md: "inline-block",
                        xs: "none",
                    },
                    marginRight: "10px"
                }}
            >
                <NavLink className={computedClassName} to="/about">About</NavLink>
            </Box>
            <NavLink className={computedClassName} end to="/home">Home</NavLink>
        </Box>
    )
}
