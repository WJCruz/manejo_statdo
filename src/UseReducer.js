import React from "react";

const SECURITY_CODE = 'paradigma'

function UseReducer({ name }) {
    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    }

    const onConfirm = () => dispatch({ type: actionTypes.confirm })
    const onError = () => dispatch({ type: actionTypes.error })
    const onCheck = () => dispatch({ type: actionTypes.check })
    const onWrite = event => dispatch({ type: actionTypes.write, payload: event.target.value })
    const onDelete = () => dispatch({ type: actionTypes.delete })
    const onReset = () => dispatch({ type: actionTypes.reset })

    const actionTypes = {
        confirm: 'CONFIRM',
        error: 'ERROR',
        check: 'CHECK',
        write: 'WRITE',
        delete: 'DELETE',
        reset: 'RESET'
    }

    const reducerObject = (state, payload) => ({
        [actionTypes.confirm]: { // se usa corchetes para no volver a redeclarar la propiedad confirm
            ...state,
            loading: false,
            confirmed: true
        },
        [actionTypes.error]: {
            ...state,
            error: true,
            loading: false,
        },
        [actionTypes.check]: {
            ...state,
            error: false,
            loading: true
        },
        [actionTypes.write]: {
            ...state,
            value: payload
        },
        [actionTypes.delete]: {
            ...state,
            deleted: true
        },
        [actionTypes.reset]: {
            ...state,
            value: '',
            deleted: false,
            confirmed: false
        }
    })
    
    const reducer = (state, action) => {
        if(reducerObject(state)[action.type]) {
            return reducerObject(state, action.payload)[action.type];
        } else {
            return state;
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        if(state.loading) {
            setTimeout(() => {
                if(state.value !== SECURITY_CODE) {
                    onError()
                } else {
                    onConfirm()
                }
            }, 2000)
        }
    }, [state.loading])

    if(!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {state.error && (
                    <p>Error: el código es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
                <input
                    placeholder="Código de seguridad"
                    disabled={state.loading}
                    value={state.value}
                    onChange={onWrite}
                />
                <button
                    onClick={onCheck}
                >
                    Comprobar
                </button>
            </div>
        )
    } else if(state.confirmed && !state.deleted) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Pedimos confirmación. ¿Estás seguro?</p>
                <button
                    onClick={onDelete}
                >
                    Sí, eliminar
                </button>
                <button
                    onClick={onReset}
                >
                    No, me arrepentí
                </button>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Eliminado con éxito</p>
                <button
                    onClick={onReset}
                >
                    Resetear, volver al inicio
                </button>
            </div>
        )
    }
}

// const reducer = (state, action) => {}

/*
const reducerIf = (state, action) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false
        }
    } else if (action.type === 'CHECK') {
        return {
            ...state,
            error: false,
            loading: true
        }
    } else {
        return {
            ...state,
        }
    }
}

const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false
            };
        case 'CHECK':
            return {
                ...state,
                error: false,
                loading: true
            };
        default:
            return {
                ...state
            }
    }
}
*/

export { UseReducer }