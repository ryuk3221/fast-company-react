import React from "react";

const BookMark = ({ status, ...rest }) => {
    return (
        <button className={(status ? "bookmark-active" : "bookmark")} {...rest}>
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
};

export default BookMark;  