import React, { Component } from 'react';
import PropTypes from 'prop-types';

function PlayerPreview (props){

  // const { avatar, username, onReset} = this.props;
  return(
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username }
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        onClick={props.onReset.bind(null, props.id)}>
        Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes ={
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}




class PlayerInput extends Component{
  constructor(props){
    super(props);
    this.state={
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e){
    const value = e.target.value;

    this.setState(function(){
      return{
        username: value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }
  render(){
    return(
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}
        >
        Submit
        </button>

      </form>
    )
  }
}
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired

}
PlayerInput.defaultProps = {
  label: 'Username'
}

class Battle extends Component{
  constructor(props) {
    super(props);
    this.state={
      playerOneName:'',
      playerTwoName:'',
      playerOneImage: null,
      playerTwoImage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

handleSubmit(id, username){
  this.setState(function(){
    const newState={};
    newState[id +'Name']=username;
    newState[id + 'Image']= 'https://github.com/' + username + '.png?size=200';
    return newState;

  })
}
handleReset(id){
  this.setState(function(){
    const newState={};
    newState[id +'Name']= '';
    newState[id + 'Image']= null;
    return newState
  })
}
  render () {
    const match = this.props.match
    const playerOneName = this.state.playerOneName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoName = this.state.playerTwoName;
    const playerTwoImage = this.state.playerTwoImage;
    return (
      <div>
        <div className='row'>
          {!playerOneName &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
           /> }

           {!playerOneImage !== null &&
             <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id='playerOne' />
           }

          {!playerTwoName &&
          <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          /> }

          {!playerTwoImage !== null &&
            <PlayerPreview
             avatar={playerTwoImage}
             username={playerTwoName}
             onReset={this.handleReset}
             id='playerTwo' />
          }
        </div>
      </div>
    )
  }
}

export default Battle;
