import React from 'react';
import Navbar from "./navbar";


function Base({
    title="My title",
    className="text-black p-4",
    children
}) {
    return (
        <div> 
           <Navbar />
            <div className="container-fluid">
                <div className="text-black text-center p-3">
    <h4 className="display-4 font-weight-bold text-dark">{title}</h4>
                </div>
    <div className={className}>{children}</div>
            </div>
        </div>
    )
}

export default Base
