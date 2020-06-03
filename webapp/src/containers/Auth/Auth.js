import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.module.css'
import {connect} from "react-redux";
import * as actions from '../../store/actions'
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from 'react-router-dom'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Adress',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    handleChange = (event, inputId) => {
        const value = event.target.value;
        const form = {...this.state.controls};
        const formElement = {...form[inputId]};
        formElement.value = value;
        formElement.valid = this.checkValidity(formElement.value, formElement.validation);
        formElement.touched = true;
        form[inputId] = formElement;

        this.setState({
            controls: form,
        })
    };

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    onSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp)
    };

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
           return{
               isSignUp: !prevState.isSignUp
           }
        })
    };

    render() {
        let form;
        const formElements = [];
        let mode, secondMode;

        if(this.state.isSignUp){
            mode = 'Sign Up';
            secondMode = 'Sign In'
        } else {
            mode = 'Sign In';
            secondMode = 'Sign Up';
        }

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        form = <form onSubmit={this.onSubmitHandler}>
            {
                formElements.map(formEl => {
                    return <Input
                        key={formEl.id}
                        invalid={!formEl.config.valid}
                        shouldValidate={formEl.config.validation}
                        touched={formEl.config.touched}
                        changed={(event) => this.handleChange(event, formEl.id)}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}/>
                })
            }
            <Button type="submit" name='Success'>{mode}</Button>
        </form>;

        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage;
        if(this.props.error){
            let msg = this.props.error.message.split('_');
            msg = msg.join(' ');
            errorMessage = <p style={{
                color:'red',
                border: '1px solid red',
                boxShadow: 'inset 0 0 10px 0 rgba(255,0,0,0.49)'
            }}>{msg}</p>
        }

        let authRedirect;
        if(this.props.isAuth){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.LoginForm}>
                {errorMessage}
                {form}
                {authRedirect}
                <Button onClick={this.switchAuthModeHandler}
                        name='Cancel'>Switch to {secondMode}</Button>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.ingr.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
        onSetAuthRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);