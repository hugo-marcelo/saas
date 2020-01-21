import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TeamsActions from '~/store/ducks/teams';
import AuthActions from '~/store/ducks/auth';

import NewTeam from '~/components/NewTeam';

import styles from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }))
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      isModalOpen: false
    }
  }

  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  handleLogout = () => {
    const { signOut } = this.props;

    signOut();
  }

  toggleModalOpen = () => {
    this.setState({isModalOpen: true});
  }

  toggleModalClose = () => {
    this.setState({isModalOpen: false});
  }

  render() {
    const { teams, selectTeam } = this.props;
    const { isModalOpen } = this.state;

    return (
      <View style={styles.container}>
        <View>
          {teams.data.map(team => (
            <TouchableOpacity key={team.id} style={styles.teamContainer} onPress={() => selectTeam(team)}>
              <Image style={styles.teamAvatar} source={{ url: `https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${team.name}` }}></Image>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.newTeam} onPress={this.toggleModalOpen}>
            <Icon name="add" size={24} color="#999"></Icon>
          </TouchableOpacity>

          <NewTeam visible={isModalOpen} onRequestClose={this.toggleModalClose} />
        </View>

        <TouchableOpacity style={styles.logout} onPress={this.handleLogout}>
          <Icon name="clear" size={24} color="#999"></Icon>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...TeamsActions, ...AuthActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TeamSwitcher);
