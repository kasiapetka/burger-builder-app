import React, {Component} from "react";
import Order from "../../components/Order/Order/Order";
import axios from '../../axiosOrders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const orders=[];

            for(let key in response.data){
                orders.push({
                    ...response.data[key],
                    id: key
                });
            }

            console.log(orders);
            this.setState({
                orders: orders,
                loading: false
            })

        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const loading = this.state.loading;
        let orders;

        if(loading){
            orders= <Spinner/>
        }else{
            orders= this.state.orders.map(order=>{
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

export default withErrorHandler(Orders,axios);