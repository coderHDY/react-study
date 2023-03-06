import React from "react";
import Nav from "./Nav";
import {
    Box,
    Button,
    Container,
    Grid,
    Hidden,
} from "@mui/material";

export default function Home() {
    return (
        <>
            <Nav /> 
            <Grid
                container
                columns={12}
                rowSpacing={1}
                columnSpacing={{
                    xs: 1,
                    sm: 2,
                    md: 3
                }}
                sx={{
                    backgroundColor: "green",
                    height: "calc(100vh - 56px)"
                }}
            >
                <Grid
                    item
                    display={{xs: "none", md: "block"}}
                    xs={false}
                    md={3}
                    bgcolor="red"
                    >
                    <Button variant="contained">Hello World!!!</Button>
                </Grid>
                <Grid item xs={12} md={9} bgcolor="#fff">
                    <Button variant="contained">Hello World</Button>
                </Grid>
            </Grid>
        </>
    );
}
