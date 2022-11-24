import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet,
    FlatList
  } from 'react-native'
  import React, { Component } from 'react'
  import {db, auth} from '../../firebase/config'
  import firebase from 'firebase'
  
  class Comments extends Component {
    constructor(props){
      super(props)
      this.state = {
        nuevoComentario:'',
        id:'',
        data:{}
      }
    }
  
    componentDidMount(){
      db
      .collection('posts')
      .doc(this.props.route.params.id)
      .onSnapshot(doc => {
        this.setState({
          id: doc.id,
          data: doc.data(),
        })
      })
    }
  
    anhadirComentario(idDoc, text){
      db
      .collection('posts')
      .doc(idDoc)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          owner:auth.currentUser.email,
          createdAt: Date.now(),
          comment: text
        })
      })
    }
  
    render() {
      console.log(this.props)
      return (
        <View>
          <Text style={styles.titulo2}>COMENTARIOS DEL POSTEO</Text>
          <View style={styles.comentarios}>
            <FlatList
            data={this.state.data.comments}
            keyExtractor={item => item.createdAt.toString()}
            renderItem={({item}) => <View>
              <Text style={styles.owner}>{item.owner} comentó:</Text>
              <Text>{item.comment}</Text>
            </View>
              }
            />
          </View>
          <View>
            <TextInput
              onChangeText={text => this.setState({nuevoComentario: text})}
              style = {styles.input}
              keyboardType='default'
              placeholder='Agregá tu comentario'
              value={this.state.nuevoComentario}
            />
            <TouchableOpacity onPress={()=> this.anhadirComentario(this.state.id, this.state.nuevoComentario)}>
              <Text style={styles.buttons}>Enviar comentario</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    input: {
      borderWidth:2,
      height:40,
      borderRadius:6,
      padding:8,
      textAlign:'center',
      marginLeft: '35%',
      marginRight: '35%'
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
    titulo2:{
      fontStyle:'italic',
      fontWeight: 500,
      fontSize: 20,
      textAlign: 'center',
    },
    comentarios:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    owner:{
      fontWeight: 100 ,
    }
  })
  
  export default Comments