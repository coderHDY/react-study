import React, { memo, useState } from 'react';
import { areEqual, VariableSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

// 可变长度，所以要给出一个计算每一个项的高度的计算公式
const getItemSize = index => index % 3 === 0 ? 60 : 30;

const getList = (num) => (
    Array.from({ length: num }, (v, i) => ({
        val: `这是第${i}个元素`,
        val2: num % 3 === 0 ? `这是第${i}个元素哈哈哈哈` : undefined,
        id: i,
    }))
);

export default function Home() {
    const [list] = useState(getList(100000));
    const Row = memo(({ index, style }) => {
        const item = list[index];
        if (!item) return null;
        return (
            <div style={style} key={item.id}>
                <div>{item.val}</div>
                {item.val2 && <div>{item.val2}</div>}
            </div>
        )
    }, areEqual);

    return (
        <>
            <div style={{ height: "90vh", width: "100vw" }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <VariableSizeList
                            height={height}
                            itemCount={1000}
                            itemSize={getItemSize}
                            layout="vertical"
                            width={width}
                        >
                            {Row}
                        </VariableSizeList>
                    )}
                </AutoSizer>
            </div>
        </>
    )
}
