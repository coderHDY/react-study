import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Nav from "./Nav";
const About = () => {
    return (
        <>
            <Nav />
            <div>这是about</div>
        </>
    )
}

export default About;