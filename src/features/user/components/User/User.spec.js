import renderer from 'react-test-renderer';
import {User} from './User';
import { Provider } from 'react-redux';
import { store } from './../../../../app/store';

it('renders correctly', () => {
  const tree = renderer
    .create( <Provider store={store}>
      <User />
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});