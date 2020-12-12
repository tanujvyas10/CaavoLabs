import React from 'react';
import './Button.css';

const Button = ({ text, color,onClick }) => {

    let backgroundColor = "green"

    backgroundColor = color === "blue" ? "rgb(58, 39, 221)":"rgb(221, 39, 57)"

    return (
        
        <div className="button" style = {{
            background:backgroundColor      
      }}  onClick={onClick}>
          <p>{text}</p>
        </div>
    )
}



export default Button;