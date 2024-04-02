import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";

import { useVirtualizer } from "@tanstack/react-virtual";

const Home = () => {
  const parentRef = React.useRef(null);
  const parentRefSync = React.useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  React.useEffect(() => {
    parentRef.current.addEventListener("scroll", (e) => {
      const offset = e.target.scrollTop;
      parentRefSync.current.scrollTop = offset;
    });
  }, []);
  React.useEffect(() => {
    parentRefSync.current.addEventListener("scroll", (e) => {
      rowVirtualizer.scrollToOffset(e.target.scrollTop);
    });
  }, [rowVirtualizer]);

  return (
    <div>
      <div>左侧虚拟列表，右侧同步</div>
      <div style={{ display: "flex" }}>
        <RowVirtualizerFixed
          rowVirtualizer={rowVirtualizer}
          parentRef={parentRef}
        />
        <RowVirtualizerFixed
          rowVirtualizer={rowVirtualizer}
          parentRef={parentRefSync}
        />
      </div>
    </div>
  );
};

function RowVirtualizerFixed({ rowVirtualizer, parentRef }) {
  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        height: `1010px`,
        width: `400px`,
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            Row {virtualRow.index}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
