import { StatusBar } from 'expo-status-bar';
import React,{useContext} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

//import { TouchableOpacity } from 'react-native-web';


const delay= ms => new Promise(res => setTimeout(res, ms));
export default function App() {

  const [notification,setnotification]=useContext("Player X to start")
  const [refresh,setrefresh]=useContext(false)

  const [board,setboard]=useContext(
    [
      " "," "," ",
      " "," "," ",
      " "," "," "
    ]
  )

  const [currentPlayer,setCurrentPlayer]=useContext("X")
  const pressField=(index)=>{
    let newBoard=board
    if(newBoard[index]!=="X" && newBoard[index]!=="O")
    {
      if(currentPlayer=="X")
      {
        newBoard[index]="X"
        setCurrentPlayer("O")
        setnotification("Player O move")
      }
      else{
        newBoard[index]="O"
        setCurrentPlayer("X")
        setnotification("Player X move")
      }
    }
    
    setboard(newBoard)
    setrefresh(!refresh)
    checkifPlayerWon()
  }

  const checkifPlayerWon=()=>{
    if(fields[0]==fields[1] && fields[1]==fields[2] && fields[0]!=" "){
      playerWon(fields[0])
    }
    else if(fields[3]==fields[4] && fields[4]==fields[5] && fields[5]!=" "){
      playerWon(fields[3])
    }
    else if(fields[6]==fields[7] && fields[7]==fields[8] && fields[8]!=" "){
      playerWon(fields[6])
    }
    else if(fields[0]==fields[4] && fields[4]==fields[8] && fields[8]!=" "){
      playerWon(fields[0])
    }
    else if(fields[2]==fields[4] && fields[4]==fields[6] && fields[6]!=" "){
      playerWon(fields[2])
    }
    else if(fields[0]==fields[3] && fields[3]==fields[6] && fields[6]!=" "){
      playerWon(fields[0])
    }
    else if(fields[1]==fields[4] && fields[4]==fields[7] && fields[7]!=" "){
      playerWon(fields[1])
    }
    else if(fields[2]==fields[5] && fields[5]==fields[8] && fields[8]!=" "){
      playerWon(fields[2])
    }
  }
  const playerWon=async(symbol)=>{
    setnotification("Player"+symbol+"WON!!!")
    await DelayNode(4000)
    setboard(
      [
        " "," "," ",
        " "," "," ",
        " "," "," "
      ]
    )
    if(symbol=="O")
    {
      setnotification("Player X to move")
    }else{
      setnotification("Player O move")
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require("./assets/bb.jpg")}
          style={styles.image1}
      />
      <StatusBar style="auto" />
      <Text style={styles.txt1}>TicTacToe</Text>
      <Text style={styles.text2}>{notification}</Text>
      <View style={styles.flat}>
        <Image source={require("./assets/bg.png")}
          style={styles.image}
        />
        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={({item,index})=>
          <TouchableOpacity style={styles.square}
            onPress={()=>pressField(index)}>
            <Text style={styles.txt3} >
              {item}
            </Text>
          </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat:{
    justifyContent:'center',
    alignItems:'center',
    height:300,
    width:'100%',
    'opacity':'50%',
  },
  txt1:{
    frontsize: 50,
    position:'absolute',
    top:60,
    color:'white',
  },
  txt2:{
    fontsize:20,
    position:'absolute',
    top:130,
    color:'white',
  },
  txt3:{
    fontsize:60,
  },
  
  list:{
    width:300,
    height:400,
  },
  square:{
    width:100,
    height:100,
    justifyContent:'center',
  },
  image:{
    width:300,
    height:300,
    position:'absolute',
  },
  image1:{
    position:'absolute',
    zIndex:-1,
    width:'100%',
    height:'100%',
  }
});
