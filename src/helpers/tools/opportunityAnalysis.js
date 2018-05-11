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
  },
  setRating (selectedOpportunityId, opportunityKey, rating) {
    let opportunitiesRef = db.collection('opportunities').doc(selectedOpportunityId)
    let setWithMerge = opportunitiesRef.set({
      ratings: {
        [opportunityKey]: rating
      }
    }, { merge: true })
  }
}
