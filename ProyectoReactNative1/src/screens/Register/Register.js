import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth, db} from '../../firebase/config'

class Register extends Component {
    constructor(){
        super()
        this.state ={
            username:'',
            email:'',
            password:'',
            biografia:'',
            mensaje:''
        }
    }

    registrarUsuario(username, email, password, biografia){
        if(username >=4 && email.includes('@') && password.length >= 5 && biografia.length >= 0){
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=> {
            return(
                db.collection('users').add({
                    email:email,
                    username:username,
                    biografia:biografia,
                    createdAt:Date.now()
                })
            )
        })

        .then(resp => this.props.navigation.navigate('Home'))
     .catch(err => console.log(this.setState({mensaje: err.message}))) 
    } else if (username.length <= 4){
       this.setState({mensaje:'El username debe ser mayor a cuatro caracteres'})     
    } else if (!email.includes('@')){
        this.setState({mensaje:'El email no se escribió correctamente'}) 
    } else if (password.length <= 5){
        this.setState({mensaje:'La contraseña deber ser mayor a cuatro caracteres'}) 
    } else if (biografia.length <= 0){
        this.setState({mensaje:'Escribe una biografia'}) 
    }
}
  render(){
    return (
    <View style={styles.container}>
        <View>
            <Text style={styles.titulo2}>Formulario de registro</Text>
            <TextInput
                style={styles.input}
                placeholder='Escribe tu nombre de usuario'
                keyboardType='default'
                onChangeText={text => this.setState({username: text})}
                value={this.state.username}
            />
            <TextInput
                style={styles.input}
                placeholder='Escribe tu email'
                keyboardType='email-address'
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input}
                placeholder='Escribe tu password'
                keyboardType='default'
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder='Escribe tu biografía'
                keyboardType='default'
                onChangeText={text => this.setState({biografia: text})}
                value={this.state.biografia}
                secureTextEntry={false}
            />
            <Text style={styles.error}>{this.state.mensaje}</Text>
            <View>
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.username, this.state.email, this.state.password, this.state.biografia)}>
                    <Text style={styles.buttons}>Registrarme</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>Ya tienes un cuenta?</Text>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttons}>Logueate</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:250,
        backgroundColor: 'lightgrey',
     
      },
      titulo:{
        fontStyle:'italic',
        fontWeight: 500,
        fontSize: 30,
        textAlign: 'center'
      },
      titulo2:{
        fontStyle:'italic',
        fontWeight: 500,
        fontSize: 20,
        textAlign: 'center',
      },
      buttons:{
        textAlign: 'center',
        borderRadius:6,
        borderWidth:4,
        padding:8,
        backgroundColor: 'grey',
      },
      input:{
        borderWidth:1,
        padding:8,
      },
      error:{
        textAlign: 'center',
        borderRadius:0,
        borderWidth:0,
        padding:0,
        backgroundColor: 'red',
      },
   })
  

export default Register