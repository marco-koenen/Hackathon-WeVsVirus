import config from 'config'
import modal from '@components/modal'
import button from '@components/button'
import patient from '@components/patient'
import storage from '@utils/localStorage'

//
// send user a notification
// --------------------------------------------------

export default (user, doctor = null, removedPatient = null) => {
  const message = doctor
    ? doctor + ' ' + config._messageCall
    : config._messageLink + ' https://www.' + window.location.hostname + '/#' + user

  // only log message for development
  if (config.localhost) {
    console.warn(message)
    return
  }

  fetch(config.fetch.endpoint + 'user/' + user + '/call', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify({
      notify_text: message
    })
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const success = data.success === 'sent'

      if (success) {
        modal.create(true, config._messageSuccess)
      } else {
        modal.create(false, config._messageError)

        // create removed patient again
        if (removedPatient) {
          let storagePatients = storage.get('patients')

          storagePatients.push(removedPatient)
          storage.set('patients', storagePatients)
          patient.init([removedPatient])
        }
      }

      button.state()
    })
    .catch(error => {
      modal.create(false, config._errorGeneral)
      button.state()
      console.warn(error)
    })
}
