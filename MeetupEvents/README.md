
# <center> MEETUP EVENTS LIST </center>
<br>

![Screen Shot of the game](src/wordguess.png)


## IMPLEMENTATION
As stated in project requirements, I used React, and made sure to use multiple components. I created four components App, Input, Events, and EventFeed.


## TECHNOLOGIES USED

For this project I used :
- Javascript
- React
- Axios
- HTML
- CSS



## CODE EXAMPLE FROM EVENTS COMPONENT

```javascript
import React from 'react';
import axios from 'axios';

class Events extends React.Component {
  constructor(){
    super();
    this.state= {
      edit:false
    }
  }
  eventDelete(key) {
    axios.delete(`https://meetupevents-b6661.firebaseio.com/${key}.json`)
    .then((res) => {this.props.getEvents();
                   this.props.addEvent();
                 })
  }

  eventEdit(key) {
    this.setState({edit: !this.state.edit})
    axios.patch(`https://meetupevents-b6661.firebaseio.com/${key}.json`, {
      title:this.text1.value,
      eventdate:this.editdate.value,
      description:this.text3.value,
      people:this.text4.value,
    })
    .then((res) => {
      this.props.getEvents();
      this.props.addEvent();
    })
  }

  editDisplay() {
    const { events } =this.props;
    return (
      <div>
      <textarea ref={(text)=>this.text1=text} placeholder={events[this.props.toShow].title} className="edit-field" />
      <input type="date" ref={(input) => this.editdate = input} placeholder="Event Date" className="event-input" />
      <textarea ref={(text)=>this.text3=text} placeholder={events[this.props.toShow].description} className="edit-field" />
      <textarea ref={(text)=>this.text4=text} placeholder={events[this.props.toShow].people} className="edit-field" />
      <button type="submit" onClick={() => this.eventEdit(this.props.toShow)} className="clean">
        Save
      </button>
      </div>

    )
  }

  regDisplay() {
    const { events } = this.props;
    return (
    <li className="eachLi">
      {events[this.props.toShow].title}<br/>
    {events[this.props.toShow].eventdate}<br/>
    {events[this.props.toShow].description}<br/>
  {events[this.props.toShow].people}
    <div className="buttons">
      <button type="submit" onClick={() => this.eventEdit(this.props.toShow)} className="clean">Edit</button>
      <button type="submit" onClick={() => this.eventDelete(this.props.toShow)} className="clean">Delete</button>
    </div>
  </li>
    )
  }
  render() {
    if(!this.state.edit){
      return (this.regDisplay());
    }
    else{
      return (this.editDisplay());
    }
  }
}


export default Events;


```

## Build Strategy

My strategy was for my project to be an event manager website, or an event list app for relevant Meetup Events for our cohort or any group of people. Initially I wanted fetch data from an external Meetup API, but that would not have met the CRUD requirements for this project. The Events component is a child of EventFeed and EventFeed renders in or is a child of App.js. Input component is a child of App. The data from the input fields in Input is stored via values derived from ref on each field. This is then posted to a Firebase database (via a relevant url) using axios. The data posted is then fetched via axios and passed to the events object, which is stored/set in state within App (getEvents function within App component- Line 30). The edit and delete functions on each event are defined and called in the Events component, and accessed or referenced via the unique firebase assigns each event. This is done by using the map function over the keys of the events object in state within App. (Refer to Line 42 in App component within addEvent function).



## Contributors
The main contributor is GA and Hakuna Matata, who helped me come up with the logic of a word game, through class work and the tweedr app exercise. Patrick through one-on-one sessions and wireframing my project in Balsamiq, helped me stay focused on deliverables for this project, what to pay attention to and what to .

## Complications/Future Improvements

- I would like to add location data from Google maps as additional info in addition to more relevant info for each Meetup

- I could not figure out how to properly use React Router and would like to have a more intuitive and cleaner interface for the user.

- I would like to add more dynammic and attractive styling via CSS and Bootstrap, and will look to make those improvements


## Authors

- Karthik Meda
- General Assembly
- Patrick Andre
