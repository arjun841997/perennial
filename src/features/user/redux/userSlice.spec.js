import userReducer,{getUsersReducer} from './userSlice'

describe('user reducer', () => {
  const initialState = {
    users: [],
    status: "idle"
  };
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      users: [],
      status: "idle"
    });
  });

  it('should get users data', () => {
    const users = userReducer(initialState, getUsersReducer())    
    expect(users).toBeDefined()
  });
})