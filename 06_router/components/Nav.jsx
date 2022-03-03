import React from 'react'
import { NavBar, Space, Toast } from 'antd-mobile'
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons';
import './nav.css';
export default function Nav() {
    const right = (
        <div style={{ fontSize: 24 }}>
            <Space style={{ '--gap': '16px' }}>
                <SearchOutline />
                <MoreOutline />
            </Space>
        </div>
    );
    const back = () =>
        Toast.show({
            content: '点击了返回区域',
            duration: 1000,
        });
    return (
        <>
            <div className='nav'>
                <NavBar onBack={back} backArrow={false}>
                    标题
                </NavBar>
            </div>
        </>
    )
}
