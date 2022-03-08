import React from 'react'
import { withRouter } from 'react-router-dom';
function Header(props) {
    const goBack = () => props.history.goBack();
    return (
        <>
            <button onClick={goBack}>goBack</button>
        </>
    )
}

export default withRouter(Header)
