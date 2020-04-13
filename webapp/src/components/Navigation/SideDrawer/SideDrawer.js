import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css'

const sideDrawer =(props)=> {

    return(
        <div className={classes.SideDrawer}>
        <Logo
        height='10%'/>
        <nav style={{marginTop: '30px'}}>
            <NavigationItems/>
        </nav>
        </div>
    );

};

export default sideDrawer;