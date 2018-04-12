import {
  store
} from './../store'

export default {
  getUnusedEthAddress () {
    // get array of ganache accounts
    let ganacheAccounts = store.state.ganacheAccounts

    // get array of used ganache accounts
    let allUsers = store.state.allUsers
    let allUsersEthAccounts = []
    allUsers.forEach(res => {
      allUsersEthAccounts.push(res.ethAccount)
    })

    // return a random account from the unused list
    let unusedGanache = ganacheAccounts.filter(x => !allUsersEthAccounts.includes(x))
    return unusedGanache[Math.floor(Math.random() * unusedGanache.length)] || 'No eth address available'
  }
}
