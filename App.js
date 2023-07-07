import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native"
import React, { useRef, useState } from "react"
import LapItem from "./components/LapItem"

export default function App() {
  const [time, setTime] = useState(0)
  const [lap, setLap] = useState([])
  const timerIdRef = useRef(null)

  const timeInputHandler = (enteredTime) => {
    setTime(enteredTime)
  }

  const onStart = () => {
    timerIdRef.current = setInterval(() => {
      setTime((prevTime) => prevTime - 1)
    }, 1000)
  }

  const onStop = () => {
    clearInterval(timerIdRef.current)
  }

  const addLapHandler = () => {
    setLap((currLaps) => [
      ...currLaps,
      { key: Math.random().toString(), value: time },
    ])
  }

  const removeLapHandler = (lapKey) => {
    setLap((currLaps) => {
      return currLaps.filter((lap) => lap.key !== lapKey)
    })
  }

  return (
    <View style={styles.container}>
      <Text>{time}</Text>
      <TextInput
        placeholder="Enter Time"
        onChangeText={timeInputHandler}
        textAlign="center"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onStart}>
          <View style={styles.startButton}>
            <Text>Start Timer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onStop}>
          <View style={styles.stopButton}>
            <Text style={styles.setTextWhite}>Stop Timer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={addLapHandler}>
          <View style={styles.lapButton}>
            <Text>Lap Time</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.flexList}>
        <FlatList
          style={styles.flexList}
          data={lap}
          renderItem={(itemData) => (
            <LapItem
              id={itemData.item.key}
              onDelete={removeLapHandler}
              title={itemData.item.value}
            />
          )}
        />
      </View>
    </View>
  )
}

const screen = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300,
    width: '100%',
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute'
  },
  buttonContainer: {
    padding: 10,
    justifyContent: "space-evenly",
  },
  startButton: {
    padding: 10,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: screen.width / 2,
    width: screen.width / 2,
    alignItems: "center",
  },
  stopButton: {
    padding: 10,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: screen.width / 2,
    backgroundColor: "red",
    width: screen.width / 2,
    alignItems: "center",
  },
  lapButton: {
    padding: 10,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: screen.width / 2,
    width: screen.width / 2,
    alignItems: "center",
  },
  flexList: {
    height: 500,
  },
  setTextWhite: {
    color: "white",
  },
})
