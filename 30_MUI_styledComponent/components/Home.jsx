import React from "react";
import Nav from "./Nav";
import {
    Button,
    Grid,
} from "@mui/material";
import styled, {
    keyframes,
} from "styled-components";

const Btn = styled.button`
    background-color: ${props => props.bgc};
    color: #fff;
`

const BlackBtn = styled(Btn)`
    {...props}
`

const RedBtn = styled(Button).attrs({
    variant: "contained",
})`
    && {
        border: 2px solid aqua;
    }
`

const rotateAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`
const RotateRedBtn = styled(Button)`
    && {
        animation: ${rotateAnimation} 1s infinite linear;
    }
`

const ReverseBtn = props => <Btn {...props}>{props.children.split("").reverse().join("")}</Btn>

export default function Home() {
    return (
        <>
            <Nav /> 
            <Grid
                container
                columns={12}
                columnSpacing={1}
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
                    <Btn bgc="red">Hello World</Btn>
                    
                    <Btn bgc="blue">Hello World</Btn>
                    
                    <BlackBtn bgc="rgb(196 161 239)" color="black">Hello World</BlackBtn>

                    <BlackBtn as={ReverseBtn} bgc="rgb(196 161 239)" color="black">Hello World</BlackBtn>

                    <RedBtn>Hello World!!</RedBtn>
                    <RotateRedBtn variant="contained">Hello World!!</RotateRedBtn>
                </Grid>
            </Grid>
        </>
    );
}
