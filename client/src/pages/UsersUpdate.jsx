import React, {Component} from 'react'
import api from '../api'

// Formulário
import UserForm from "../components/Form/UserForm"
// Função de validação dos campos do formulário
import validate from "../components/Form/FormValidateUser"

// -- Hook Principal
class UsersUpdate extends Component {
    // Definição do construtor
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            nome: "",
            email: "",
            acesso: "",
            erros: [],
            nomeArquivo: "",
            urlArquivo: "",
            foto: {}
        }
    }

    // Guarda o dado vindo do input
    handleChange = async event => {
        const {name, value} = event.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    // Guarda o dado vindo do upload da imagem de perfil
    handleUpload = async event => {
        const file = event.target.files[0];
        this.setState({
            ...this.state,
            nomeArquivo: "profile."+file.name,
            urlArquivo: URL.createObjectURL(file),
            foto: file
        })
    }

    // Salva as mudanças no banco
    handleUpdateUser = async () => {
        // Recebe os campos coletados
        const {id, nome, email, acesso, senha, nomeArquivo, urlArquivo, foto} = this.state
        const error = validate(this.state)
        
        /*
        await api.post(
            `/controle-usuario/${id}`,
            data
        );
        */
        this.setState({
            ...this.state,
            erros: error
        });

        if (error.validated) {
            // Cria usuário atualizado
            const usuarioAtualizado = {
                nome,
                email,
                acesso,
                senha,
                nomeArquivo,
                urlArquivo
            }

            // Guarda usuário atualizado no banco
            await api
                .atualizarUsuario(id, usuarioAtualizado)
                .then(res => {
                    window.alert("Usuário atualizado com sucesso.")
                })

            const data = new FormData();
            data.append("foto", foto);
            
            fetch('http://localhost:3000/api/controle-usuario', {
                method: 'POST',
                body: data
            })
            .then(res => res.json())    
        }
    }

    componentDidMount = async () => {
        const {id} = this.state;
        const usuario = await api.encUsuarioPorID(id);
        
        this.setState(
            {nome: usuario.data.data.nome, email: usuario.data.data.email, acesso: usuario.data.data.acesso, senha: usuario.data.data.senha, nomeArquivo: usuario.data.data.nomeArquivo, urlArquivo: usuario.data.data.urlArquivo}
        );
    }

    // Formulário - Atualização
    render() {
        return (
            <div>
                <UserForm
                    data={this.state}
                    handleChange={this.handleChange}
                    handleUpload={this.handleUpload}
                    onSubmit={this.handleUpdateUser}
                    typeForm="Atualizar"
                    edit={true}
                /> 
            </div>
        )
    }
}

export default UsersUpdate