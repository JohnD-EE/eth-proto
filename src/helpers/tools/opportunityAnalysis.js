import {store} from './../../store'
import { db } from '../../main'

export default {
  createOpportunity (title) {
    let docData = {
      user: store.state.user.email,
      title: title,
      ratings: {}
    }
    db.collection('opportunities').doc().set(docData)
    .then(res => {
      // Done
      store.dispatch('newNotification', {
        title: 'New Opportunity Created:',
        text: title,
        type: 'success'
      })
      store.dispatch('registerUserOpportunities')
    })
  }
}
