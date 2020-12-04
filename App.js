import React, {useState, useRef, useEffect } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import ScreenOrientation from 'expo-screen-orientation';

const App = () => {

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  // each object in the data array represents one question/answer itteration.
  // questionTime key is the moment on wich the video will be set on 'pause' and display the answers.
  // answers key lists the answers : answerText is the text to display on an answer button. answerTimecode is the timecode to seek to (depends if good or wrong answer).

  // Rendre dynamique le videoId

  const data = [
    {
      questionsTime: Number(19),
      answers:
              [
              { answerText: "CSS",
                answerTimecode: 95
              },
              { answerText: "HYPERTEXT",
                answerTimecode: 20
              },
              { answerText: "JE NE SAIS PAS",
                answerTimecode: 20,
              },
            ]
    },
    {
      questionsTime: Number(25),
      answers:
              [
              { answerText: "R2A",
                answerTimecode: 45,
              },
              { answerText: "R2B",
                answerTimecode: 98
              },
              { answerText: "R2C",
                answerTimecode: 98
              },
              { answerText: "JE NE SAIS PAS",
                answerTimecode: 98
              }
            ]

    },{
      questionsTime: Number(40),
      answers:
              [
              { answerText: "R3A",
                answerTimecode: 150,
              },
              { answerText: "R4B",
                answerTimecode: 210
              },
              { answerText: "R5C",
                answerTimecode: 210
              },
              { answerText: "JE NE SAIS PLUS",
                answerTimecode: 210
              }
            ]
            ,
    }
  ]

  //Counter pour les savoir a quelle sequence de question reponse on est :
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
          setCounter(counter + 1)
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
    if (data[counter]) {
      if (time === data[counter].questionsTime) {
        setPlay(false)
        setQuestion(true)
      }
    }
  }, [time])

  return (

    <View style={styles.interactivityContainer}>

      <View style={styles.videoContainer}>
      <YoutubePlayer
        webviewstyle={{width: 600}}
        height={screen_heigth}
        ref={playerRef}
        videoId={'BgAvqXcPxoM'}
        play={play}
        initialPlayerParams={{
          controls: true,
          preventFullScreen: false
        }}/>
        </View>

      { question ? (

      <View style={styles.answers}>
        {displayAnswers(data[counter].answers)}
      </View>

) : (
  null
  )
}
    </View>
  )
};

export default App;

const screen_width = Dimensions.get("window").width;
const screen_heigth = Dimensions.get("window").height;


const styles = StyleSheet.create({
interactivityContainer: {
    transform: [{ rotate: "-90deg" }, {translateX: -170}, {translateY: -170}],
    height: screen_width - 20,
    width: screen_heigth - 20,
    top: 0,
    backgroundColor: "black"
},
  answers: {
    color: "white",
    flexWrap: "wrap",
    flexDirection:"row",
    justifyContent:"space-around",
    width: screen_heigth - 20,
    position: "absolute",
  },
  response: {
    color: "white",
    fontSize: 20,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 7,
    opacity: 0.7,
  },
  // interactivityContainer: {
  //   marginTop: 44,
  //   backgroundColor: "pink",
  //   position: "relative",
  // },
})