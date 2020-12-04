import React, {useState, useRef, useEffect } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';


const App = () => {

  //Time est la variable qui defini le temps ecoulé de la video.
  const [time, setTime] = useState(0);

  //Play pour mettre en pause/play la video.
  const [play, setPlay] = useState(true)

  //PlayRef pour referencer le composant Youtube et pouvoir agir dessus avec les buttons entre autres.
  const playerRef = useRef();

  //useState Question pour afficher les boutons des questions
  const [question1, setQuestion1] = useState(false)
  const [question2, setQuestion2] = useState(false)

  //Creation d'un "onProgress" qui n'est pas prevu dans le package react native youtube iframe.
  useEffect(() => {
    const interval = setInterval(async () => {
      // interval.setMaxListeners(20) // je dois augmenter la capacité de l'enventListener. Soit en global soit ici.
      const time_sec = await playerRef.current.getCurrentTime();
      setTime(Math.floor(time_sec));
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  //Rendre dynamique les moments ou la video se met en pause.
  const pauses = Number(19)
  const pause2 = Number(110)

  //Les texte des boutons reponses.
  const answer1 = "HTML";
  const answer2 = "CSS";

  const answer3 = "DU TEXTE";
  const answer4 = "UNE IMAGE";

  const idontknow = "JE NE SAIS PAS"


  // Je surveille la variable time pour agir sur le composant Youtube a un certain timecode (mise en pause)
  useEffect(() => {
    pauses.forEach(element => {

    });
    if (time === element) {
      setPlay(false)
      setQuestion1(true)
    }
     if (time === pause3) {
     setPlay(false)
     setQuestion2(true)
   }
  }, [time])

  return (
    <View>
      <View>

      <YoutubePlayer
        style={styles.videoContainer}
        height={250}
        ref={playerRef}
        videoId={'BgAvqXcPxoM'}
        play={play}
        initialPlayerParams={{
          controls:true,
          preventFullScreen:false
        }}/>

        </View>

      {question1 ? (

      <View style={styles.answers}>

      <TouchableOpacity
          onPress={() => {
          playerRef.current.seekTo(20, true)
          setQuestion1(false)
          setPlay(true)
          }
          }>
        <Text style={styles.response}>{answer1}</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => {
          playerRef.current.seekTo(95, true)
          setQuestion1(false)
          setPlay(true)
          }
          }>
        <Text style={styles.response}>{answer2}</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => {
          playerRef.current.seekTo(20, true)
          setQuestion1(false)
          setPlay(true)
          }
          }>
        <Text style={styles.response}>{idontknow}</Text>
      </TouchableOpacity>

      </View>

      ) :  question2 ? (

        <View style={styles.answers}>

      <TouchableOpacity
          onPress={() => {
          playerRef.current.seekTo(147, true)
          setQuestion2(false)
          setPlay(true)
          }
          }>
        <Text style={styles.response}>{answer3}</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => {
          playerRef.current.seekTo(111, true)
          setQuestion2(false)
          setPlay(true)
          }
          }>
        <Text style={styles.response}>{answer4}</Text>
      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => {
          playerRef.current.seekTo(111, true)
          setQuestion2(false)
          setPlay(true)
          }
          }>
        <Text style={styles.response}>{idontknow}</Text>
      </TouchableOpacity>

      </View>

      ) : (
        null
      )
    }

      {/* TIMER OPTIONNEL */}
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex: 1}}>{'elapsed time'}</Text>
          <Text style={{flex: 1, color: 'green'}}>{time}</Text>
        </View>
    </View>
    </View>
  )
};

export default App;

  const screen_width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  videoContainer:{
    position:"relative",
  },
  answers: {
    marginTop: 100,
    position:"absolute",
    color: "white",
    flexDirection:"row",
    justifyContent:"space-around",
    width: screen_width,
  },
  response: {
    color: "white",
    fontSize: 20,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 7
  }
})