import React, {Component} from "react";
import Auxiliary from "../hoc/Auxiliary";

class BurgerBuilder extends Component {

    render() {
        return (
            <Auxiliary>
                <div>Burger</div>
                <div>build controls</div>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;