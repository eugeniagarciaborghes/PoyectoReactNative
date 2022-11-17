import  {Text, View, Style, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {Camera } from "expo-camera"
import { storage } from '../../firebase/config';

class Camara extends Component {
    constructor(){
        super()
        this.state = {
            permiso:false,
            fotoUri:'',
            mostrarCam: false
        }
    }

    componentDidMount () {
        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({
                mostrarCam : true
            })
        })
        .catch(err => console.log(err))

    }

    sacarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(photo => this.setState({
            fotoUri: photo.uri,
            mostrarCam:false
        }))
        .catch(error => console.log(error))
    }

    guardarFoto(url){
        fetch(url)
        .then(binarioGigante => binarioGigante.blob())
        .then(()=>{
            let ref = storage.ref(`photos/${Dat.now()}.jpg`)
            return ref.put(image)
        })
        .then()
        .catch(error => console.log(error))
    }

    descartarFoto(){
        this.setState({
            fotoUrl:'',
        })
    }

    render(){
        return(
            
            <View style = {styles.container}>
                {
                    this.state.mostrarCam ?
                    <Camara
                    style = {styles.camarabody}
                    type = {Camera.Constants.Type.back}
                    ref={metodosDelComponente => this.metodosDeCamara = metodosDelComponente}
                    />
                    <TouchableOpacity onPress={ () => this.sacarFoto()}>
                        <Text>Sacar Foto</Text>

                    </TouchableOpacity>
                    : this.mostrarCam === false && this.state.fotoUri != '' ?
                    <View>
                        
                    </View>



                }
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1
    },
    camarabody : {
        flex : 1,
    }
})

export default Camara