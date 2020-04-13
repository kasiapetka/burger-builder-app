import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css'

const navigationItems =(props)=>(
  <ul className={classes.NavigationItems}>
      <NavigationItem
      path='/'
      label='Burger Builder'
      active={true}
      />
      <NavigationItem
          path='/'
          label='Checkout'
      />
  </ul>

);

export default navigationItems;