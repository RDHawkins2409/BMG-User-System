import React, { Component } from 'react';
import { Home } from './components/Home';

import './custom.css'
import { NavMenu } from './components/NavMenu';
import { Container } from 'reactstrap';
import { Login } from './components/Login';

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = { user: -1, login: true }
  }

  loginCall = async (e, username, password) => {
    e.preventDefault();
    const response = await fetch("user/" + username + "/" + password);
    const data = await response.json();
    console.log(data);
    if(data !== -1){
      this.setState({
        user:data,
        login:false
      })
    }
  }

  updateUserStatus = async(status) => {
    await fetch("user/" + this.state.user + "/" + status, {
      method: 'POST',
    });
  }

  render() {
    let contents = this.state.login
      ? <Login loginCall={this.loginCall}/>
      : <Home />

    return (
      <div>
        <NavMenu updateUser={this.updateUserStatus}/>
        <Container>
          {contents}
        </Container>
      </div>
    );
  }
}
