const initState = {
  users: Array.from({ length: 200 }, (val, i) => {
    return { 
      fullName: `Full Name ${i}`, 
      balance: (i * (Math.random() * 100)).toFixed(2), 
      isActive: !Math.round(Math.random()), 
      registered: !Math.round(Math.random()), 
      state: `State ${i}` , 
      country: `Country ${i}`
    }
  })
}

const users = (state = initState, action) => {
  return state;
}

export default users;