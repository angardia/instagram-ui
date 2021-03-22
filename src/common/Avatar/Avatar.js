import React from 'react';
import PropTypes from "prop-types";
import "./Avatar.scss";

export default function Avatar(props) {

    const img = props.image;
    const size = props.size || "md";

    return (
        <div>
            <img src={img} size={size} className={`Avatar Avatar--${size}`} alt="User Avatar" />
        </div>
    )
}

Avatar.propTypes = {
    size: PropTypes.oneOf(["sm", "md", "lg"])
};

