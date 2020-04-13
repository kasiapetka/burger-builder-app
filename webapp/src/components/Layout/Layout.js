import React from 'react'
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css"

const layout = (props) =>(
<Auxiliary>
  <div>
      Toolbar SideDraver Backdrop
  </div>
    <main className={classes.Layout}>
    {props.children}
    </main>
</Auxiliary>
);

export default layout;