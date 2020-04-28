import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state={
            requestInt: null,
            responseInt:null,
            error:null
        };

        constructor(props) {
            super(props);
            this.requestInt = axios.interceptors.request.use(request=>{
                this.error=null;
                return request;
            });

            this.responseInt = axios.interceptors.response.use(response => response, error => {
                this.error= error;
                return Promise.reject(error)
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInt);
            axios.interceptors.request.eject(this.responseInt);
        }

        errorConfirmedHandler=()=>{
            this.setState({error: null})
        };

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;