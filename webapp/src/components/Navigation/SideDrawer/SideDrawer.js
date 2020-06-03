import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import WithClass from "../../../hoc/WithClass";


const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Closed];

    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <WithClass classes={classes.SideDrawerElements}>
            <Backdrop
                show={props.show}
                clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')}>
                <Logo
                    height='10%'/>
                <nav style={{marginTop: '30px'}}>
                    <NavigationItems
                        isAuth={props.isAuth}/>
                </nav>
            </div>
        </WithClass>
    );

};

export default sideDrawer;