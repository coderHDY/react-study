import React, { memo, useState, Suspense } from "react";
import { areEqual, VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

// 可变长度，所以要给出一个计算每一个项的高度的计算公式
const getItemSize = (index) => (index % 3 === 0 ? 60 : 30);

// 生成不定高度list
const getList = (num) =>
    Array.from({ length: num }, (v, i) => ({
        val: `这是第${i}个元素`,
        val2: i % 3 === 0 ? `这是第${i}个元素哈哈哈哈` : undefined,
        id: i,
    }));

export default function Home() {
    const [list] = useState(getList(100000));
    const navigate = useNavigate();
    const Row = memo(({ index, style }) => {
        const item = list[index];
        if (!item) return null;
        return (
            <div
                style={{ ...style, cursor: "pointer" }}
                key={item.id}
                onClick={() => navigate("/detail", { state: { key: index } })}
            >
                <div>{item.val}</div>
                {item.val2 && <div>{item.val2}</div>}
            </div>
        );
    }, areEqual);

    return (
        <>
            <div style={{ height: "90vh", width: "100vw" }}>
                <Nav /> 
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

                {/* <h2>纵向长列表</h2>
                <div className="column">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                </div>
                <Nav /> */}

            </div>
        </>
    );
}
