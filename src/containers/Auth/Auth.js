import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import * as actionTypes from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import { updateObject, checkValidity } from '../../shared/utility/utility'

class Auth extends Component {
    state = {
        control: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
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
        formIsValid: false,
        isSignup: true
    }

    componentDidMount() {
        console.log(this.props.buildingBurger, this.props.authRedirectPath)
        console.log('[Auth] not loaded')
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/burger_builder') {
            console.log('[Auth] loaded')
            this.props.onAuthRedirectPath()
        }
    }


    // orderHandler = (event) => {
    //     event.preventDefault()
    //     this.setState({ loading: true })
    //     const formData = {}
    //     // eslint-disable-next-line no-unused-vars
    //     for (let orderKey in this.state.orderForm) {
    //         formData[orderKey] = this.state.orderForm[orderKey].value
    //     }
    //     const order = {
    //         ingredients: this.props.ingrd,
    //         price: this.props.totalPrice.toFixed(2),
    //         deliveryMethod: 'fastest',
    //         orderData: formData
    //     }

    //     this.props.onPurchaseBurgerStart(order)
    //     // axios.post('/orders.json', order)
    //     //     .then(response => {
    //     //         this.setState({ loading: false })
    //     //         this.props.history.push('/')
    //     //     })
    //     //     .catch(error => {
    //     //         this.setState({ loading: false })
    //     //     })
    // }

    switchSingup = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.control, {
            [controlName]: updateObject(this.state.control[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.control[controlName].validation),
                touched: true
            })
        })

        let formIsValid = true
        // eslint-disable-next-line no-unused-vars
        for (let ctrl in updatedControls) {
            formIsValid = updatedControls[ctrl].valid && formIsValid
        }
        // console.log(this.state.formIsValid)
        this.setState({ control: updatedControls, formIsValid: formIsValid })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state.control.email.value, this.state.control.password.value, this.state.isSignup)
    }

    render() {
        const formElementsArray = []
        // eslint-disable-next-line no-unused-vars
        for (let key in this.state.control) {
            formElementsArray.push({
                id: key,
                config: this.state.control[key]
            })
        }

        let form = (formElementsArray.map(elm => {
            return <Input
                key={elm.id}
                elementType={elm.config.elementType}
                elementConfig={elm.config.elementConfig}
                value={elm.config.value}
                invalid={!elm.config.valid}
                shouldValidate={elm.config.validation}
                touched={elm.config.touched}
                changed={(event) => this.inputChangedHandler(event, elm.id)}
            />
        }))

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null
        if (this.props.isAuth) {
            console.log('here')
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button
                        btnType='Success'
                        disabled={!this.state.formIsValid} >SUBMIT</Button>
                </form>
                <Button
                    btnType='Danger'
                    clicked={this.switchSingup}
                >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.ingrd.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (email, password, isSignup) => dispatch(actionTypes.auth(email, password, isSignup)),
        onAuthRedirectPath: () => dispatch(actionTypes.authRedirectPath('/checkout'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)