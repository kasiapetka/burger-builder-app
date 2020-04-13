import React from 'react'
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css"
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) =>(
<Auxiliary>
    <Toolbar/>
    <SideDrawer/>
  <div>
      SideDraver Backdrop
  </div>
    <main className={classes.Layout}>
    {props.children}
    </main>
</Auxiliary>
);

export default layout;