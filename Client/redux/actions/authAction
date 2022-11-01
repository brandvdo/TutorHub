export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

const BASE_URL = 'http://70.177.34.147:3000';

export const registerUser = (authData) => {
    const {fullName, email, password,profileType} = authData;

    return async dispatch => {

        // logic to make a post to REGISTER the user
        const result = await fetch(`${BASE_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
                profileType
            })
        })

        const resultData = await result.json();

        if(resultData.success) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: resultData
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL
            });
        }

        return resultData;
    }
}

export const loginUser = (authData) => {
    const {email, password} = authData;

    return async dispatch => {

        // logic to make a post to LOGIN the user
        const result = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const resultData = await result.json();

        if(resultData.success) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resultData
            });
        } else {
            dispatch({
                type: LOGIN_USER_FAIL
            });
        }

        return resultData;

    }
}
