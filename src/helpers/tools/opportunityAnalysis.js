import {store} from './../../store'
import { db } from '../../main'

export default {
  createOpportunity (title) {
    let docData = {
      user: store.state.user.email,
      opportunity: {
        title: title,
        ratings: {}
      }
    }
    db.collection('opportunities').doc().set(docData)
    .then(res => {
      // Done
      console.log('Opportunity Created: ', res)
    })
  }
}
