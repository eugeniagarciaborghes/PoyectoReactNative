import { Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            likesCount:props.data.likes.length,
            commentCount: props.data.comments.length,
            isMyLike: false
        }
    }

    componentDidMount(){
      let myLike = this.props.data.likes.includes(auth.currentUser.email)
      if(myLike){
        this.setState({
          isMyLike:true
        })
      }
    }

    like(){
      db
      .collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(()=> {
        this.setState({
          isMyLike:true,
          likesCount: this.state.likesCount + 1
        })
      })
      .catch(err => console.log(err))

    }

    unlike(){
      db
      .collection('posts')
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(()=> {
        this.setState({
          isMyLike:false,
          likesCount: this.state.likesCount - 1
        })
      })
      .catch(e => console.log(e))
    }
    

  render() {
    return (
      <View>
        <Text style={styles.owner}>{this.props.data.owner}</Text>
        
        <Text>{this.props.data.descripcion}</Text>
        <Text>cantidad de comentarios: {this.state.commentCount}</Text>
      <View style={styles.likes}>
        <Text>cantidad de likes: {this.state.likesCount}</Text>  
        {
           this.state.isMyLike ?
                <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='red' size={16} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={16} />
                </TouchableOpacity>
        }
        </View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate(
            'Comments',
            {id:this.props.id}
            )}>
            <Text style={styles.buttons}>Agregar comentario</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  owner:{
    fontWeight: 100 ,
  },
  buttons:{
    borderRadius:6,
    borderWidth:2,
    padding:2,
    backgroundColor: 'grey',
    textAlign:'center',
  },
})

export default Post