import React, { Component } from 'react'
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {},
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                     ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true
            },
            }, 
        formIsValid: false,
        loading: false
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if ( rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid 
        }
        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const formData = {}
        for (let orderKey in this.state.orderForm) {
            formData[orderKey] = this.state.orderForm[orderKey].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            deliveryMethod: 'fastest',
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormEl = {
            ...updatedForm[inputId]
        }
        updatedFormEl.value = event.target.value
        updatedForm[inputId] = updatedFormEl
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation)
        updatedFormEl.touched = true
        
        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid
        }
        console.log(updatedFormEl)

        this.setState({ orderForm: updatedForm, formIsValid: formIsValid })
    }

    render () {
        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}> 
                {formElementsArray.map(elm => {
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
                })}
                
                <Button btnType='Success' disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            console.log('spinner');
            
            form = <Spinner />
        }
     return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            { form }
        </div>
    )
 }
}

export default ContactData