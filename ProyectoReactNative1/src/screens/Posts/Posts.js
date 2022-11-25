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
        console.log("enviarposteo");
        db.collection('posts').add({
            owner: auth.currentUser.email,
            date: Date.now(),
            descripcion: text,
            likes:[],
            comments:[],
            url: this.state.url
        })
        .then(()=>{
            console.log("posteado")
            this.setState({descripcion:''},
            () => this.props.navigation.navigate('Home')
            )
        })
        .catch(err => console.log(err))
    }

    cuandoSubaLaFoto (url) {
        this.setState({
            url: url,
            mostrarCam : false
            
        })
    }


    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.texto}>Crea tu posteo</Text>
            {
                this.state.mostrarCam ?
                <Camara style={styles.camara}
                    cuandoSubaLaFoto = {url=> this.cuandoSubaLaFoto(url)}
                /> : 
                <View>


                </View>
            }
        
            <TextInput
                keyboardType='default'
                placeholder='Descripcion'
                onChangeText={text => this.setState({descripcion: text})}
                style = {styles.input}
                value={this.state.descripcion}
            />
            <View>
                <TouchableOpacity onPress={()=> this.enviarPosteo(this.state.descripcion)}>
                    <Text style={styles.buttons}>Enviar posteo</Text>
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
    camara:{
        width: 50

    },
    input: {
        borderWidth:2,
        height:40,
        borderRadius:6,
        padding:8,
        textAlign:'center',
        marginLeft: '35%',
        marginRight: '35%'
    },
    texto:{
       fontStyle:'italic',
       fontWeight: 500,
       fontSize: 20,
       textAlign: 'center',
    },
    buttons:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:6,
        borderWidth:2,
        padding:8,
        backgroundColor: 'grey',
        textAlign:'center',
        marginLeft: '40%',
        marginRight: '40%'
      },
})

export default Posts