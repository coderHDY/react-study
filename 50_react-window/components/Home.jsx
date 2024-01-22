// @monaco-editor/react + ajv
import React, { useState, useEffect, useRef } from "react";
import { FixedSizeList as List } from 'react-window';
 
const Row = ({ index, style }) => (
  <div style={style}>
    Row {index}
  </div>
);
 
const Home = () => (
  <List
    height={1000}
    itemCount={1000}
    itemSize={35}
    scrollTop={150}
  >
    {Row}
  </List>
);
export default Home;
