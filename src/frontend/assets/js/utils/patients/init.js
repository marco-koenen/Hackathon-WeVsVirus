import config from 'config'
import storage from '@utils/localStorage'
import create from './create'

//
// initiate the patient list
// --------------------------------------------------

export default () => {
  const patients = storage.get('patients')
  const label = document.querySelector(config.userList).querySelector('label')

  if (!patients) return

  patients.forEach(patient => create(patient.name, patient.phone, patient.user, patient.doctor))
}
