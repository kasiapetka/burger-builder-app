import React, {Component} from 'react'
import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.module.css"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component{

    state={
      showSideDrawer: false,
    };

    sideDrawerToggleHandler=()=>{
        this.setState((prevState)=>{
            return {
                showSideDrawer: !this.state.showSideDrawer
            }
        });
    };

   render(){
       return(
           <Auxiliary>
               <Toolbar
               clicked={this.sideDrawerToggleHandler}/>
               <SideDrawer
               clicked={this.sideDrawerToggleHandler}
               show={this.state.showSideDrawer}/>

               <main className={classes.Layout}>
                   {this.props.children}
               </main>
           </Auxiliary>
       )
   }
}

const mapStateToProps = state =>{
  return {
      isAuth: state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);