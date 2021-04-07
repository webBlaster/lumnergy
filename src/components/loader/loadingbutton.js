import React from "react";
import { Button, Spinner } from "react-bootstrap";

const LoadingButton = ({ name, loading, type = "submit" }) => {
    return (
        <Button
            variant="primary"
            type={type}
            disabled={loading}
            block
        >
            {name}
            {loading ? (< Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />) : ""}
        </Button>
    )
}

export default LoadingButton;