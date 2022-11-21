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
      <View>
      <Text>Perfil</Text>
      <Text>aca van los posteos del usuario</Text>
      <TouchableOpacity 
        onPress={() => this.signOut()}
        style={styles.button}  
      >
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  perfil:{
      fontSize: 50,  
  },
  button:{
    borderRadius: 2,
    padding:3,
    backgroundColor: 'red',
  }
})


export default Perfil