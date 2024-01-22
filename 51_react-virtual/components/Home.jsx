// @monaco-editor/react + ajv
import React, { useState, useEffect, useRef } from "react";
// import { ScrollSync } from "react-scroll-sync";
import { AutoSizer, Grid, ScrollSync } from "react-virtualized";
import { scrollbarSize } from "utils/helper";
import "css/react-virtual-styles.css";

const LEFT_COLOR_FROM = hexToRgb("#471061");
const LEFT_COLOR_TO = hexToRgb("#BC3959");
const TOP_COLOR_FROM = hexToRgb("#000000");
const TOP_COLOR_TO = hexToRgb("#333333");

export default class GridExample extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      columnWidth: 75,
      columnCount: 50,
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 60,
      rowCount: 100,
    };
  }

  render() {
    const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
    } = this.state;

    return (
      <div>
        <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth,
          }) => {
            const x = scrollLeft / (scrollWidth - clientWidth);
            const y = scrollTop / (scrollHeight - clientHeight);

            const leftBackgroundColor = mixColors(
              LEFT_COLOR_FROM,
              LEFT_COLOR_TO,
              y
            );
            const leftColor = "#ffffff";
            const topBackgroundColor = mixColors(
              TOP_COLOR_FROM,
              TOP_COLOR_TO,
              x
            );
            const topColor = "#ffffff";
            const middleBackgroundColor = mixColors(
              leftBackgroundColor,
              topBackgroundColor,
              0.5
            );
            const middleColor = "#ffffff";

            return (
              <div className={"GridRow"}>
                {/* 第一列固定 */}
                <div
                  className={"LeftSideGridContainer"}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    color: leftColor,
                    backgroundColor: `rgb(${topBackgroundColor.r},${topBackgroundColor.g},${topBackgroundColor.b})`,
                  }}
                >
                  <Grid
                    cellRenderer={this._renderLeftHeaderCell}
                    className={"HeaderGrid"}
                    width={columnWidth}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    rowCount={1}
                    columnCount={1}
                  />
                </div>
                <div
                  className={"LeftSideGridContainer"}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: rowHeight,
                    color: leftColor,
                    backgroundColor: `rgb(${leftBackgroundColor.r},${leftBackgroundColor.g},${leftBackgroundColor.b})`,
                  }}
                >
                  <Grid
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this._renderLeftSideCell}
                    columnWidth={columnWidth}
                    columnCount={1}
                    className={"LeftSideGrid"}
                    height={height - scrollbarSize()}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={columnWidth}
                  />
                </div>
                <div className={"GridColumn"}>
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <div>
                        <div
                          style={{
                            backgroundColor: `rgb(${topBackgroundColor.r},${topBackgroundColor.g},${topBackgroundColor.b})`,
                            color: topColor,
                            height: rowHeight,
                            width: width - scrollbarSize(),
                          }}
                        >
                          <Grid
                            className={"HeaderGrid"}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={rowHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width - scrollbarSize()}
                          />
                        </div>
                        <div
                          className="haaha"
                          style={{
                            backgroundColor: `rgb(${middleBackgroundColor.r},${middleBackgroundColor.g},${middleBackgroundColor.b})`,
                            color: middleColor,
                            height,
                            width,
                          }}
                        >
                          <Grid
                            className={"BodyGrid"}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={height}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </div>
    );
  }

  _renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftSideCell({ columnIndex, key, rowIndex, style });
  };

  _renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
  };

  _renderLeftHeaderCell = ({ columnIndex, key, style }) => {
    return (
      <div className={"headerCell"} key={key} style={style}>
        {`C${columnIndex}`}
      </div>
    );
  };

  _renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => {
    const classNames = "";

    return (
      <div className={classNames} key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  };
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function mixColors(color1, color2, amount) {
  const weight1 = amount;
  const weight2 = 1 - amount;

  const r = Math.round(weight1 * color1.r + weight2 * color2.r);
  const g = Math.round(weight1 * color1.g + weight2 * color2.g);
  const b = Math.round(weight1 * color1.b + weight2 * color2.b);

  return { r, g, b };
}
