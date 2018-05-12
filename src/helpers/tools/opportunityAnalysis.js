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
  deleteOpportunity (selectedOpportunityId) {
    let opportunitiesRef = db.collection('opportunities').doc(selectedOpportunityId)
    opportunitiesRef.delete()
    .then(res => {
      // Done
      store.dispatch('newNotification', {
        title: 'Deleting Opportunity',
        text: '',
        type: 'success'
      })
      store.dispatch('registerUserOpportunities')
    })
  },
  setRating (selectedOpportunityId, opportunityKey, rating, opportunityTitle) {
    let opportunitiesRef = db.collection('opportunities').doc(selectedOpportunityId)
    opportunitiesRef.set({
      ratings: {
        [opportunityKey]: rating
      }
    }, { merge: true })
    .then(res => {
      // Done
      store.dispatch('newNotification', {
        title: 'New rating registered for ' + opportunityTitle,
        text: '',
        type: 'success'
      })
      store.dispatch('registerUserOpportunities')
    })
  },
  unsetRating (selectedOpportunityId, opportunityKey, opportunityTitle) {
    let opportunitiesRef = db.collection('opportunities').doc(selectedOpportunityId)
    opportunitiesRef.set({
      ratings: {
        [opportunityKey]: 0
      }
    }, { merge: true })
    .then(res => {
      // Done
      store.dispatch('newNotification', {
        title: 'Unsetting rating for ' + opportunityTitle,
        text: '',
        type: 'success'
      })
      store.dispatch('registerUserOpportunities')
    })
  }
}
