import React, {Component} from "react";
import Order from "../../components/Order/Order/Order";
import axios from '../../axiosOrders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreators from "../../store/actions";
import {connect} from "react-redux";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }

    render() {
        const loading = this.props.loading;
        let orders = <Spinner/>;

        if (!loading) {
            console.log(this.props.orders);
            orders = this.props.orders.map(order => {
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            })
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
};

const mapStateToProps = state =>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(actionCreators.fetchOrders(token,userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));