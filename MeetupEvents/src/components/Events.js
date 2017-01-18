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
