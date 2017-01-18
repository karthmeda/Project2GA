import React from 'react';
import axios from 'axios';
import moment from 'moment';

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
      title:this.edittitle.value,
      eventdate:moment(this.editdate.value).format('MM/DD/YYYY'),
      people:this.editpeople.value,
      description:this.editdescr.value,
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
      <textarea ref={(text)=>this.edittitle=text} placeholder={events[this.props.toShow].title} className="edit-field" /><br/>
      <input type="date" ref={(input) => this.editdate = input} placeholder="Event Date" className="event-input" /><br/>
      <textarea ref={(text)=>this.editdescr=text} placeholder={events[this.props.toShow].description} className="edit-field" /><br/>
      <textarea ref={(text)=>this.editpeople=text} placeholder={events[this.props.toShow].people} className="edit-field" /><br/>
      <button type="submit" onClick={() => this.eventEdit(this.props.toShow)} className="clean">
        Save
      </button>
     <button type="submit" onClick={()=> this.setState({edit:!this.state.edit})}>
       Cancel
     </button>
      </div>

    )
  }

  regDisplay() {
    const { events } = this.props;
    return (
    <li className="eachLi">
      <span className="list-field">Meetup Name: </span> {events[this.props.toShow].title}<br/>
      <br/>
    <span className="list-field">Meetup Date: </span> {events[this.props.toShow].eventdate}<br/>
    <br/>
  <span className="list-field">Meetup Details: </span> {events[this.props.toShow].description}<br/>
  <br/>
<span className="list-field">Who's Going?:</span> {events[this.props.toShow].people}
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
