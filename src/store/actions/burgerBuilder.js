import axios from '../../axios-orders'

import * as actionTypes from '../actions/actionTypes'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.DEL_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-mcgs.firebaseio.com/ingredients.json')
            .then(resp => {
                dispatch(setIngredients(resp.data))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed(error))
            })
    }
}
