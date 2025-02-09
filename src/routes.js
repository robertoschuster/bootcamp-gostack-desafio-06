import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
      Repository,
    },
    {
      defaultNavigationOptions: {
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
      },
    },
  ),
);

export default Routes;
