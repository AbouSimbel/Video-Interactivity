import React, {useState, useRef, useEffect } from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';


const App = () => {


  //Counter pour les savoir a quelle seauence de question reponse on est :
  const [counter, setCounter] = useState(0)

  //Time est la variable qui defini le temps ecoulé de la video.
  const [time, setTime] = useState(0);

  //Play pour mettre en pause/play la video.
  const [play, setPlay] = useState(true)

  //PlayRef pour referencer le composant Youtube et pouvoir agir dessus avec les buttons entre autres.
  const playerRef = useRef();

  //useState Question pour afficher les boutons des questions
  const [question, setQuestion] = useState(false)

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


  //LES INFOS A RECUPERER DU JSON INTERACTIVITY
  //Rendre dynamique les moments ou la video se met en pause.
  const questionsTime = [Number(5), Number(25), Number(105)]


  //Les texte et le timecode des boutons reponses.
  const answers = [
    { answerText: "HTML",
    answerTimecode: 20
  },
    { answerText: "CSS",
    answerTimecode: 95
  },
    { answerText: "HYPERTEXT",
    answerTimecode: 20
  },
    { answerText: "JE NE SAIS PAS",
    answerTimecode: 20
  }
]

  const displayAnswers = (theAnswers) => {
    let answersToDisplay = [];
    for (let i=0; i<theAnswers.length; i++ ) {
      answersToDisplay.push(

        <TouchableOpacity
          key={i}
          onPress={() => {
          playerRef.current.seekTo(theAnswers[i].answerTimecode, true)
          setQuestion(false)
          setPlay(true)
          }
          }>
            <Text style={styles.response}>{theAnswers[i].answerText}</Text>
        </TouchableOpacity>
      )
    }
    return answersToDisplay;
  }

  // Je surveille la variable time pour agir sur le composant Youtube a un certain timecode (mise en pause)
  useEffect(() => {
    questionsTime.forEach(element => {
      if (time === element) {
        setPlay(false)
        setQuestion(true)
      }
    });
  }, [time])

  return (
    <View style={styles.interactivityContainer}>

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

      { question ? (

      <View style={styles.answers}>
        {displayAnswers(answers)}
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
    flexWrap: "wrap",
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
  },
  interactivityContainer: {
    marginTop: 100
  }
})