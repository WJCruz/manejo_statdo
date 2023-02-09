import React from "react";

const SECURITY_CODE = 'paradigma'

class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false,
        };
    }

    componentDidUpdate() { // se ejecuta cada vez que haya cambio de estado
        if(this.state.loading) {
            setTimeout(() => {
                if(this.state.value !== SECURITY_CODE) {
                    this.setState({ error: true })
                }
                this.setState({ loading: false })
            }, 2000)
        }
    }

    render() {
        // const { value, error, loading } = this.state
        const handleChange = () => {
            this.setState({
                error: false,
                loading: !this.state.loading
            })
        }
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {this.state.error && (
                    <p>Error: el código es incorrecto</p>
                )}
                {this.state.loading && (
                    <p>Cargando...</p>
                )}
                <input
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={event =>{
                        this.setState({ value: event.target.value })
                    }}
                />
                <button
                    onClick={handleChange}
                >
                    Comprobar
                </button>
            </div>
        )
    }
}

export { ClassState }