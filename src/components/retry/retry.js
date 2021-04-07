import React from "react";
import "./retry.css";

const Retry = (props) => {
    return (
        <div className="retry-container text-center black-text" hidden={ props.show? false: true }>
            <div className="content">
                <h3 className="text-muted mb-4">The page could not be loaded :(</h3>
                <button className="btn btn-primary white-text" onClick={ () => props.retry() }>
                    Retry
            </button>
            </div>
        </div>
    )
}

export default Retry;