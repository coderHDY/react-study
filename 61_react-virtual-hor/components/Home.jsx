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
  const horVirtualizer = useVirtualizer({
    count: 10000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
    horizontal: true,
  });

  React.useEffect(() => {
    parentRef.current.addEventListener("scroll", (e) => {
      const offset = e.target.scrollLeft;
      parentRefSync.current.scrollLeft = offset;
    });
  }, []);
  React.useEffect(() => {
    parentRefSync.current.addEventListener("scroll", (e) => {
      horVirtualizer.scrollToOffset(e.target.scrollLeft);
    });
  }, [horVirtualizer]);

  return (
    <div>
      <div>左侧虚拟列表，右侧同步</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <RowVirtualizerFixed
          horVirtualizer={horVirtualizer}
          parentRef={parentRef}
        />
        <RowVirtualizerFixed
          horVirtualizer={horVirtualizer}
          parentRef={parentRefSync}
        />
      </div>
    </div>
  );
};

function RowVirtualizerFixed({ horVirtualizer, parentRef }) {
  return (
    <div
      ref={parentRef}
      className="List"
      style={{
        width: `1010px`,
        height: `400px`,
        // overflow: "auto",
        overflow: "overlay",
      }}
    >
      <div
        style={{
          width: `${horVirtualizer.getTotalSize()}px`,
          height: "100%",
          position: "relative",
          display: "flex",
        }}
      >
        {horVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${virtualRow.size}px`,
              transform: `translateX(${virtualRow.start}px)`,
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
