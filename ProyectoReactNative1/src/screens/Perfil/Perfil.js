import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Perfil extends Component {
  constructor(props){
    super(props)
    this.state ={
      allComments: []
    }
  }

  componentDidMount(){
    db.collection('posts').onSnapshot(docs => {
      let comments = []
      docs.forEach(doc => {
        comments.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        allComments: comments
      }, () => console.log(this.state.allComments))
    })
  }

  signOut(){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }
  
  render(){
    return (
      <View style={styles.container}>
      <Text>Perfil</Text>
      <Text>aca van los posteos del usuario</Text>
      <TouchableOpacity onPress={() => this.signOut()}>
        <Text style={styles.buttons}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  perfil:{
      fontSize: 50,  
  },
  container:{
    flex:1,
    justifyContent:'center',
    paddingHorizontal:300,
    backgroundColor: 'lightgrey',
  },
  buttons:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:6,
    borderWidth:2,
    padding:8,
    backgroundColor: 'grey',
  },
})


export default Perfil