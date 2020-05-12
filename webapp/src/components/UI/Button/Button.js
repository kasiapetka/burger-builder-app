import React from "react";
import classes from "./Button.module.css";


const button =(props)=>{

    const classNames = [];
    classNames.push(classes.Button);

    if(props.name === 'Success'){
        classNames.push(classes.Continue);
    }
    if(props.name === 'Cancel'){
        classNames.push(classes.Cancel);
    }

    return(
        <button className={classNames.join(' ')}
                {...props}
                onClick={props.onClick}>{props.children}

        </button>

    );
};

export default button;