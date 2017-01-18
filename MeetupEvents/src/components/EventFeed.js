import React from 'react';


class EventFeed extends React.Component {

  render() {
    const { addEvent }= this.props;
    return (
        <ul className="list-of-events">
            {addEvent()}
        </ul>
      )
  }

}




export default EventFeed;
