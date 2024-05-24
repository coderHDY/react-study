import React from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const factor = 6;
export default class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "a", x: 0, y: 0, w: 1, h: 2 },
      { i: "b", x: 1, y: 0, w: 3, h: 2 },
      { i: "c", x: 4, y: 0, w: 1, h: 2 },
      { i: "d", x: 5, y: 0, w: 1, h: 3 },
      { i: "e", x: 6, y: 0, w: 1, h: 4 },
      { i: "f", x: 7, y: 0, w: 1, h: 5 },
    ].map((item) => {
      item.x = item.x * factor;
      item.y = item.y * factor;
      item.w = item.w * factor;
      return item;
    });
    return (
      <GridLayout
        onLayoutChange={(layout) => console.log(layout)}
        className="layout"
        layout={layout}
        cols={12 * factor}
        rowHeight={30}
        width={1200}
        height={600}
        margin={[0, 0]}
        containerPadding={[0, 0]}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
        <div key="d">d</div>
        <div key="e">e</div>
        <div key="f">f</div>
      </GridLayout>
    );
  }
}
