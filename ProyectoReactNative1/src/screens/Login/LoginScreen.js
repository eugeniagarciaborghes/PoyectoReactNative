import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    componentDidMount(){
      auth.onAuthStateChanged(user => {
        if(user !== null){
          this.props.navigation.navigate('TabNavigation')
        }
      })
    }


    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch( err => console.log(err))
    }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titulo}>INSTACLICK</Text>
          <Text style={styles.titulo2}>LOGIN</Text>
          <TextInput
              style={styles.input}
              keyboardType='email-address'
              placeholder='Ingresa tu email'
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
          />
          <TextInput
              style={styles.input}
              keyboardType='default'
              placeholder='Ingresa tu Password'
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
          />
          <View>
              <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                  <Text style={styles.buttons}>Login</Text>
              </TouchableOpacity>
          </View>

          <View>
            <Text>
              Aún no tienes una cuenta?
            </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}>
              <Text style={styles.buttons}>Registrate</Text>
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
    }
})

export default LoginScreen