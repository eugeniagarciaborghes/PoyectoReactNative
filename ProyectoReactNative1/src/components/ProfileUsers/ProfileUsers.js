import { Text, View, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db,} from '../../firebase/config'
import Post from '../../components/Post/Post'

class UsersProfile extends Component {

    constructor(props){
        super(props)
        this.state={
          misDatos: {},
          id:'',
          posts: [],
          loader: true
        }
    }

    componentDidMount(){
        db.collection('users')
        .where('email', '==', this.props.route.params.email)
        .onSnapshot(doc => {
          doc.forEach(doc => this.setState({
            id: doc.id,
            misDatos: doc.data()
          })) 
        })
        db.collection('posts')
        .where('email', '==', this.props.route.params.email)
        .onSnapshot(docs => {
          let posts = []
          docs.forEach(doc => {
              posts.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          this.setState({
              posts: posts,
              loader: false
          })
      })
    }

    componentDidUpdate(){
      db.collection('users')
      .where('email', '==', this.props.route.params.email)
      .onSnapshot(doc => {
        doc.forEach(doc => this.setState({
          id: doc.id,
          misDatos: doc.data()
        })) 
      })
      db.collection('posts')
      .where('email', '==', this.props.route.params.email)
      .onSnapshot(docs => {
        let posts = []
        docs.forEach(doc => {
            posts.push({
                id: doc.id,
                data: doc.data()
            })
        })
        this.setState({
            posts: posts,
            loader: false
        })
    })
  }

   
  render() {
    return (
        this.state.loader ? <Text>Cargando</Text> :
        <>
        <View style={styles.container}>
          <View style={styles.card}>
            <Image style={styles.image}
              source={{uri: this.state.misDatos.foto}} 
              resizeMode = 'cover'
            />
            <View style={styles.usuarioYMail}>
               <Text style={styles.textCard}>{this.state.misDatos.usuario}</Text>
               <Text style={styles.textCard}>{this.state.misDatos.email}</Text>
            </View>
          </View>      
          <Text style={styles.text}>Bio: {this.state.misDatos.biografia}</Text>   
          <Text style={styles.text}>Numero de posteos: {this.state.posts.length}</Text>

          <Text style={styles.textPublicaciones}>Posteos</Text>

          {this.state.posts.length >= 1 ? 
          <View style={styles.publicaciones}>
          <FlatList 
            data = {this.state.posts}
            keyExtractor = {(item) => item.id.toString()}
            renderItem = {(item) => <Post data={item.item.data} id={item.item.id} />} 
          />
          </View>
          :
          <Text>No hay publicaciones</Text>
          }
        </View>
        </>
      )
    } 
}



  

export default ProfileUsers;