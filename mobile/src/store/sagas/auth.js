import { call, put, select } from 'redux-saga/effects';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { AsyncStorage } from 'react-native';
import api from '~/services/api';
import NavigationService from '~/services/navigation';

import AuthActions from '../ducks/auth';
import TeamsActions from '../ducks/teams';

export function* init() {
  const token = yield AsyncStorage.getItem('@Saas:token');

  console.tron.log(token);

  if (token) {
    yield put(AuthActions.signInSuccess(token));
  }

  const team = yield AsyncStorage.getItem('@Saas:team');

  console.tron.log('Time:', team);

  if (team) {
    yield put(TeamsActions.selectTeam(JSON.parse(team)));
  }

  yield put(AuthActions.initCheckSuccess());
}

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    yield AsyncStorage.setItem('@Saas:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));
    NavigationService.navigate('Main');
  } catch (error) {
    yield put(ToastActionsCreators.displayError('Credenciais inválidas'));
  }
}

export function* signOut() {
  yield AsyncStorage.clear();

  NavigationService.navigate('SignIn');
}

export function* getPermissions() {
  const team = yield select(state => state.teams.active);
  const signedIn = yield select(state => state.auth.signedIn);

  if (!signedIn || !team) {
    return;
  }

  const response = yield call(api.get, 'permissions');

  const { roles, permissions } = response.data;

  yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}
