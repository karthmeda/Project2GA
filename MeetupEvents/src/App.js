import React, { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Events from './components/Events';
import EventFeed from './components/EventFeed';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
        events:{},
    }

    this.addEvent = this.addEvent.bind(this);
    this.getEvents=this.getEvents.bind(this);
  }
  componentDidMount() {
    this.getEvents();

  }

  getEvents() {
    const url = 'https://meetupevents-b6661.firebaseio.com/.json';
    //send `GET` request to firebase database
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      this.setState({ events: res.data })


    })

    .catch((error) => {
      console.log(error);
    })
  }

  addEvent() {
    if(this.state.events){
      let feed=Object.keys(this.state.events)
      .reverse()
      .map((key,i) => {
        console.log(key)
        return (
          <Events
            key={key}
            getEvents={this.getEvents}
            addEvent={this.addEvent}
            toShow={key}
            events={this.state.events} />
              )
      })
      return feed;
    }
  }



  render() {
    // console.log(this.state.messages)
    return (
      <div className="App">
        <div className="App-header">
          <h2>MEETUP EVENTS LIST</h2>
          <h5>Let's go to a Meetup!</h5>
        </div>
        <br/>
        <Input
          getEvents={this.getEvents}
          addEvent={this.addEvent}
           />
        <div className="feed-list">
          <br/>
        <EventFeed
          id='tweedrfeed'
          addEvent={this.addEvent}
          />
        </div>
      </div>
    );
  }
}

export default App;
