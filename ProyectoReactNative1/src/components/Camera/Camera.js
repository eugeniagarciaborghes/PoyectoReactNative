import  {Text, View, StyleSheet, Image,  TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {Camera } from "expo-camera"
import { storage } from '../../firebase/config';

class Camara extends Component {
    constructor(){
        super()
        this.metodosDeCamara = null,
        this.state = {
            permiso:false,
            mostrarCam: false,
            url:'',
            
        }
    }

    componentDidMount () {
        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({
                mostrarCam : true,
                //aliendro
                permiso : true
            })
        })
        .catch(err => console.log(err))

    }

    sacarFoto(){
        console.log("sacar foto");
        this.metodosDeCamara.takePictureAsync()
        .then(photo => this.setState({
            url: photo.uri,
            mostrarCam:false
        }))
        .catch(error => console.log(error))
    }

    usarImagen(){
        console.log("usar foto");
        fetch(this.state.url)
        .then(imagenBinario => imagenBinario.blob())
        .then(image =>{
            let ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(image)
            .then (() => {
                ref.getDownloadURL ()
                .then((url) => this.props.cuandoSubaLaFoto(url) )
                .catch(err => console.log(err))

            })
        })
        .then()
        .catch(error => console.log(error))
    }

    

    descartarFoto(){
        this.setState({
            url:'',
            //aliendro
            mostrarCam : true
        })
    }

    render(){
        return(
            
            <View style = {styles.container}>
                {       
                    this.state.mostrarCam ?
                    <>
                        <Camera
                            style = {styles.camarabody}
                            type = {Camera.Constants.Type.back}
                            ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                        />
                        <TouchableOpacity onPress={ () => this.sacarFoto()}>
                            <Text>Sacar Foto</Text>

                        </TouchableOpacity>
                    </> 
                    
                    : this.state.mostrarCam === false && this.state.url != '' ?
                    <View>
                        <Image
                            source={{url: this.state.url}}
                            style= {styles.image}
                            resizeMode = 'cover'
                        />
                        <TouchableOpacity 
                            onPress={()=> this.usarImagen()}>
                            <Text>
                                Usar Imagen
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={()=> this.descartarFoto()}>
                            <Text>
                                Rechazar
                            </Text>
                        </TouchableOpacity>
                    </View> :
                    
                    <Text>
                        No tenemos permiso para mostrar la foto
                    </Text>



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
        height : 500
    },
    image :{
        height: 200

    }
})

export default Camara