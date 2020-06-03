import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            exact
            path='/'
            label='Burger Builder'
        />

        {
            props.isAuth
                ?
                <React.Fragment>
                    <NavigationItem
                        path='/orders'
                        label='Orders'
                    />
                    <NavigationItem
                        path='/logout'
                        label='Log Out'
                    />
                </React.Fragment>
                :
                <NavigationItem
                    path='/login'
                    label='Log In'
                />
        }

    </ul>

);

export default navigationItems;