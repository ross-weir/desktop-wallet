import React, { Component } from "react";
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Link } from 'react-router-dom'

import wallet from '../images/wallet.png';

import ALF from "alf-client";
const storage = ALF.utils.Storage();

class Init extends Component {
  constructor() {
    super();
    this.state = {
      usernames: [],
      username: '',
      password: '',
    };
  }

  render() {
     return(
       <div>
        <div className="welcome">
          <h1>Welcome!</h1>
          <img alt="wallet" src={wallet} className="logo"/>
        </div>
        <div>
          <Autocomplete
            id="username"
            options={this.state.usernames}
            renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
            onInputChange={e => this.updateUsername(e) }
          />
          <TextField className="field" label="Password" type="password"
            value={this.state.password} 
            onChange={e => this.updatePassword(e) }
          />
        </div>
        <div className="actions">
          <p><Button onClick={e => this.login(e)} variant="contained" className="buttonLarge">Login</Button></p>
        </div>
        <hr/>
        <div className="actions">
          <p>
            <Link to="/create">
              <Button variant="contained" className="buttonLarge">Create a new wallet</Button>
            </Link>
          </p>
          <p>
            <Link to="/import">
              <Button variant="contained" className="buttonLarge">Import a wallet</Button>
            </Link>
          </p>
        </div>
       </div>
    );
  }

  async componentDidMount() {
    this.setState({ 
      usernames: storage.list()
    });
  }

  login(e) {
    const walletEncrypted = storage.load(this.state.username);
    ALF.wallet.open(this.state.password, walletEncrypted);
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  updateUsername(e) {
    this.setState({
      username: e.target.innerText
    });
  }
}

export default Init;
