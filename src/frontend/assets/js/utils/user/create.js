import config from 'config'
import storage from '@utils/localStorage'
import patients from '@utils/patients'
import modal from '@components/modal'
import button from '@components/button'
import notification from './notification'

//
// create a new user
// --------------------------------------------------

export default () => {
  const inputPhone = document.querySelector(config.userPhone)
  const phone = inputPhone.value
  const inputFirstName = document.querySelector(config.userFirstName)
  const firstName = inputFirstName.value
  const inputName = document.querySelector(config.userName)
  const name = inputName.value
  const doctor = document.querySelector(config.doctorSelect).value
  const room = config.room

  // required fields
  if (!phone || !room || !name || !firstName) {
    modal.create(false, config.missingField)
    return
  }

  // force at least one doctor
  if (!doctor) {
    modal.create(false, config.doctorMissing)
    return
  }

  const body = {
    phone: phone,
    room: room
  }

  fetch(config.fetch.endpoint + 'user/create', {
    method: 'POST',
    headers: config.fetch.headers,
    mode: config.fetch.mode,
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      const user = data.user_hash

      if (user) {
        let storagePatients = storage.get('patients')

        patients.create(firstName + ' ' + name, phone, user, doctor)

        // clear inputs
        inputPhone.value = ''
        inputName.value = ''
        inputFirstName.value = ''

        // save the user to the patients list
        storagePatients = storagePatients === null ? [] : storagePatients
        storagePatients.push({
          user: user,
          name: firstName + ' ' + name,
          phone: phone,
          doctor: doctor
        })

        storage.set('patients', storagePatients)

        // send new patient his dashboard link
        notification(user)
      }

      button.state()
    })
    .catch(error => {
      modal.create(false, config.generalError)
      button.state()
      console.warn(error)
    })
}
