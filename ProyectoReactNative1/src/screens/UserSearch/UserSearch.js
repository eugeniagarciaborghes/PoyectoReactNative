import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase/config';
import { FontAwesome } from '@expo/vector-icons';


export default class UserSearch extends Component {
    constructor() {
        super()
        this.state={
            users: [],
            resultados: [],
            filterBy:'',
            busqueda: false
        }
    }

    componentDidMount(){
        db.collection('users').onSnapshot(docs=>{
            let users = [];
            //users que es un array vacio le agrego con push toda la info de firebase
            docs.forEach(doc=>{
            users.push( {
                //id del usuario de la coleccion de firebase
                id:doc.id, 
                //metodo de firebase que guarda la info de cada usuario
                data:doc.data()})
    
        })
        //igualo el state vacio con el array con los datos de firebase
            this.setState({
            users: users,
           
            })
        })
    }
        
    filter(filtro){
        console.log(this.state.resultados)
        if (this.state.filterBy.length !== 0 ) {
            let resultadosFiltrados = this.state.users.filter((user) => {return user.data.email.toLowerCase().includes(filtro.toLowerCase())})
            this.setState({resultados: resultadosFiltrados})
            console.log(resultadosFiltrados)  
            this.setState({
                filterBy: '',
                busqueda: true
        })   
        }else{
            this.setState({resultados:[]})
        } 
        
    }

  render() {
    return (
        <ScrollView>
            <View >
            <TextInput
                
                keyboardType='default'
                placeholder='buscar'
                onChangeText={busqueda=>this.setState({filterBy: busqueda})}
                value={this.state.filterBy}
            />

            <TouchableOpacity
               
                onPress={()=>{this.filter(this.state.filterBy)}}
            >
            <Ionicons name="search-sharp" size={24} color="black" />
            </TouchableOpacity>
            </View>

            {this.state.resultados.length ?
            <View> 
            <Text style={styles.text}><strong>Resultados de búsqueda</strong></Text>
            <FlatList
                    data={this.state.resultados}
                    keyExtractor={item=>item.id.toString()}
                    ItemSeparatorComponent={()=>(<View style={{height: 1, backgroundColor: '#B7B9BF', width: 300, marginVertical: 5, alignSelf:'center'}}></View>)}
                    renderItem={({item})=> 
                    <TouchableOpacity 
                        onPress={()=>{this.props.navigation.navigate('Mi perfil')}}
                    >
                        <div style={styles.listadoUsers}>
                        <FontAwesome name="user-circle" size={40} color="black" />
                        <Text style={styles.userName}><strong>{item.data.email}</strong></Text>
                        </div>
                    </TouchableOpacity>}
            >
            </FlatList>
            </View> 

            :

            this.state.busqueda &&

            <View>
                <Text >No hubo coincidencias con la búsqueda</Text>
            </View>

            }
            
        </ScrollView>
    )
  }
}

