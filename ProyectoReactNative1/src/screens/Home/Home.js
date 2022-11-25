import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import Post from '../../components/Post/Post'
import {db} from '../../firebase/config'

class Home extends Component {
  constructor(){
    super()
    this.state={
      allPosts:[]
    }
  }

  componentDidMount(){
    db.collection('posts')
    .orderBy('date', 'desc')
    .limit(3)
    .onSnapshot(docs => {
      let publicaciones = []
      docs.forEach(doc => {
        publicaciones.push({
          id:doc.id,
          data:doc.data()
        })
      })

    this.setState({
      allPosts: publicaciones
    }, ()=> console.log(this.state.allPosts))

    })
  }
  
  render(){
    return (
      <>
        <View style={styles.container1}>
          <Text style={styles.titulo}>POSTS</Text>
        </View>
        <View style={styles.container2}>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  
  container2:{
    flex:2,
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  image:{
    height:300
  },
  titulo:{
    fontStyle:'italic',
    fontWeight: 500,
    fontSize: 20,
    textAlign: 'center',
  },
})

export default Home