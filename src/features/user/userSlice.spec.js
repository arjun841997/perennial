import userReducer,{getUsersReducer} from './userSlice'

describe('user reducer', () => {
  const initialState = {
    users: []
  };
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      users: []
    });
  });

  it('should get users data', () => {
    const users = userReducer(initialState, getUsersReducer())    
    expect(users).toBeDefined()
  });
})