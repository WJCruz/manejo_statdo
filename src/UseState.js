import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false
    })

    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false
        })
    }

    const onConfirm = () => {
        setState({
            ...state,
            loading: false,
            confirmed: true
        })
    }

    const onWrite = newValue => {
        setState({
            ...state,
            value: newValue
        })
    }

    const onCheck = () => {
        setState({
            ...state,
            error: false,
            loading: true
        })
    }

    const onDelete = () => {
        setState({
            ...state,
            deleted: true
        })
    }

    const onReset = () => {
        setState({
            ...state,
            value: '',
            deleted: false,
            confirmed: false
        })
    }

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
                    value={state.value}
                    onChange={event => {
                        onWrite(event.target.value)
                    }}
                />
                <button
                    onClick={() => {
                        onCheck()
                    }}
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
                    onClick={() => {
                        onDelete()
                    }}
                >
                    Sí, eliminar
                </button>
                <button
                    onClick={() => {
                        onReset()
                    }}
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
                    onClick={() => {
                        onReset()
                    }}
                >
                    Resetear, volver al inicio
                </button>
            </div>
        )
    }
}

export { UseState }