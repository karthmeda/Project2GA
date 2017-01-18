import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';



class Input extends Component {

  createEvent() {

    axios({
      method:'post',
      url: `https://meetupevents-b6661.firebaseio.com/.json`,
      data:{
        title:this.eventstitle.value,
        eventdate:moment(this.eventsdate.value).format('MM/DD/YYYY'),
        people:this.eventspeople.value,
        description:this.eventsdesc.value,

      }

    }).then( () => {
      this.props.getEvents();
      this.props.addEvent();
      this.eventstitle.value= "";
      this.eventsdate.value= "";
      this.eventsdesc.value= "";
      this.eventspeople.value= "";

    });

    }




  render() {
    console.log()
    return (
      <div>
      <label for="title">Meetup Name: </label>
      <input type="text" ref={(input) => this.eventstitle = input} id="title" placeholder="Event Title" className="event-input" />
      <br/>
      <label for="date">Meetup Date: </label>
      <input type="date" ref={(input) => this.eventsdate = input} id="date" placeholder="Event Date" className="event-input" />
      <br/>
      <label for="descr">Meetup Details: </label>
      <textarea rows="8" cols="50"  ref={(text) => this.eventsdesc = text} id="descr" placeholder="Enter Description " className="event-input" />
      <br/>
      <label for="descr">Who's Going: </label>
      <input type="text" ref={(input) => this.eventspeople = input} id="people" placeholder="Who's Going?" className="event-input" />
      <br/>
      <button type="submit" onClick={()=> this.createEvent()}  id="button">
       Share Meetup
      </button>
    </div>
    )
  }
}

Input.propTypes = {
  addEvent: React.PropTypes.func.isRequired
}

export default Input;
