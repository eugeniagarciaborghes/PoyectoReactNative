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
      console.log(docs)
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
          <Text>POSTS</Text>
        </View>
        <View style={styles.container3}>
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
    justifyContent:'center',
    alignItems:'center'
  },
  container2:{
    flex:3
  },
  container3:{
    flex:5
  },
  image:{
    height:300
  }
})

export default Home