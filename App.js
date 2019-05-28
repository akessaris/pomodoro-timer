import * as React from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import { Constants } from 'expo';

const POMODORO = '25'
const SHORT_BREAK = '05'
const LONG_BREAK = '10'

class Count extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <Text style={styles.count}>{this.props.min}:{this.props.sec}</Text>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      min: '00',
      sec: '00',
      resetPrev: '00',
      isOn: false,
      completed: false,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.dec, 1000)
  }

  dec = () => {
    if (this.state.isOn) {
      let min = Number(this.state.min)
      let sec = Number(this.state.sec)

      //Check if new minute
      if (sec === 0) {
        //Check if timer is completed
        if (min === 0) {
         this.setState({min:'00', sec:'00', isOn: false, completed: true})
         Vibration.vibrate(1000)
         return
        }
        min = String(min-1)
        sec = 59
      }
      else {
        sec = sec-1
      }

    //Proper time formatting
    if (Math.floor(min/10) === 0) {
      min = '0' + String(min%10)
    }
    if (Math.floor(sec/10) === 0) {
     sec = '0' + String(sec%10)
    }

    //Set the new state
    this.setState({min:min, sec:sec})
    }
  }

  start = () => {this.setState({isOn: true})}

  pause = () => {this.setState({isOn: false})}

  reset = () => {
    this.setState(prevState => ({
      min: prevState.resetPrev, sec:'00', completed: false
    }))
  }

  setPomodoro = () => {this.setState({min: POMODORO, sec:'00', resetPrev:POMODORO, completed: false})}

  setShortBreak = () => {this.setState({min: SHORT_BREAK, sec:'00', resetPrev:SHORT_BREAK, completed: false})}

  setLongBreak = () => {this.setState({min: LONG_BREAK, sec:'00', resetPrev:LONG_BREAK, completed: false})}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Pomodoro Timer</Text>
        <Count min={this.state.min} sec={this.state.sec} done={this.state.done}/> 

        <View flexDirection="row"> 
          <Button title="Start" onPress={this.start}/>  
          <Button title="Pause" onPress={this.pause}/>
          <Button title="Reset" onPress={this.reset}/>
        </View>

        <View flexDirection="row">
          <Button title="Pomodoro" onPress={this.setPomodoro}/>  
          <Button title="Short Break" onPress={this.setShortBreak}/>  
          <Button title="Long Break" onPress={this.setLongBreak}/>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  count: {
    fontSize: 100,
  },
  title: {
    fontSize: 40,
  },
});