import React from "react";
import classes from './Toolbar.module.css'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuBar from "./MenuBar/MenuBar";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <MenuBar
        clicked={props.clicked}/>
      <Logo
          height='80%'/>
      <nav className={classes.DesktopOnly}>
          <NavigationItems/>
      </nav>

    </header>
);

export default toolbar;