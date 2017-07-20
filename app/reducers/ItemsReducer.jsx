const initialState = [
  {
    description: 'Mobile App Development',
    quantity: 2,
    price: 5000
  },
  {
    description: 'Landing Page',
    quantity: 3,
    price: 1000
  },
  {
    description: 'Email Marketing Campagin',
    quantity: 1,
    price: 1000
  }
]

const SettingsReducer = (state = initialState, action) => {
  switch(action.type) {
  default:
    return state;
  }
}

export default SettingsReducer;
