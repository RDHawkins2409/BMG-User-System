import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.populateUserData();
    this.interval = setInterval(() => this.pingChanges(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  static elapsedTime(ms){
    let seconds = ms/1000;
    const hours = parseInt(seconds/3600);
    seconds = seconds % 3600;
    const minutes = parseInt(seconds/60);
    seconds = parseInt(seconds % 60);
    if (hours > 0){
      return hours + ":" + minutes + ":" + seconds;
    }
    else if (minutes > 0){
      return minutes + ":" + seconds;
    }
    else {
      return seconds;
    }
  }

  static renderUsersTable(users) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Activity</th>
            <th>Time Elapsed</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.UserID}>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>{this.elapsedTime(Date.now() - Date.parse(user.updated))}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Home.renderUsersTable(this.state.users);

    return (
      <div>
        <h1 id="tabelLabel" >Everyone Online</h1>
        <p>This demonstrates who is online and what they are doing</p>
        {contents}
      </div>
    );
  }

  async populateUserData() {
    const response = await fetch('user');
    const data = await response.json();
    this.setState({ users: data, loading: false });
  }

  //Only to check for changes
  async pingChanges() {
    this.forceUpdate();
    const response = await fetch('user/ping');
    const data = await response.json();
    if(data === true){
      this.populateUserData();
    }
  }
}
