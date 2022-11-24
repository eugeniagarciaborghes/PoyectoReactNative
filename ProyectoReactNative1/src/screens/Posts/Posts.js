import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import Camara from '../../components/Camera/Camera'

class Posts extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            descripcion:'',
            mostrarCam : true, 
            url : ''
        }
    }

    enviarPosteo(text){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            username: username,
            date: Date.now(),
            descripcion: text,
            likes:[],
            comments:[],
            url: this.state.url
        })
        .then(()=>{
            this.setState({descripcion:''})
        })
        .catch(err => console.log(err))
    }

    cuandoSubaLaFoto (url) {
        this.setState({
            url: url,
            //mostrarCam : false
            
        })
    }


    render() {
        return (
        <View style = {styles.container}>
            {
                this.state.mostrarCam ?
                <Camara
                cuandoSubaLaFoto = {(url)=> this.cuandoSubaLaFoto(url)}
                /> : 
                <View>


                </View>
            }
            
            <Text>Crea tu posteo</Text>
            <TextInput
                keyboardType='default'
                placeholder='Descripcion'
                onChangeText={text => this.setState({descripcion: text})}
                style = {styles.input}
                value={this.state.descripcion}
            />
            <View>
                <TouchableOpacity onPress={()=> this.enviarPosteo(this.state.descripcion)}>
                    <Text>Enviar posteo</Text>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex : 1,

    },
    input:{
        borderWidth:1,
        height:48
    }
})

export default Posts