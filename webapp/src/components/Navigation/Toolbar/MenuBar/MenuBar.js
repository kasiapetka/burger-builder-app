import React from "react";
import classes from './MenuBar.module.css'


const menuBar = (props) => (
   <div className={classes.Menubar} onClick={props.clicked}>
       <div></div>
       <div></div>
       <div></div>
   </div>
);

export default menuBar;