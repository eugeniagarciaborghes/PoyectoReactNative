import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'

class Posts extends Component {
    constructor(){
        super()
        this.state = {
            descripcion:''          
        }
    }

    enviarPosteo(text){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            date: Date.now(),
            descripcion: text,
            likes:[],
            comments:[]
        })
        .then(()=>{
            this.setState({descripcion:''})
        })
        .catch(err => console.log(err))
    }


    render() {
        return (
        <View>
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
    input:{
        borderWidth:1,
        height:48
    }
})

export default Posts