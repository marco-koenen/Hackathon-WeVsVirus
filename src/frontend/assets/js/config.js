//
// global settings
// --------------------------------------------------

const config = {
  webpack: '/assets/js/',
  origin: window.location.origin,
  hash: window.location.hash,
  lang: document.documentElement.lang,
  localhost: window.location.hostname === 'localhost',
  room: localStorage.getItem('room') || null,
  user: localStorage.getItem('user') || null,
  fetch: {
    endpoint: 'https://backend.un-chain.us/',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },

  // conditionals
  isLoading: 'is-loading',
  isError: 'is-error',
  isSuccess: 'is-success',
  isHidden: 'is-hidden',
  isVisible: 'is-visble',
  isClose: 'is-close',
  isOpen: 'is-open',

  // global selectors
  content: document.querySelector('.page-content'),
  overlay: document.querySelector('.overlay'),

  // global classNames
  view: '.view',
  userDashboard: '.user-dashboard',
  waitingRoom: '.waiting-room',
  createWaitingRoom: '.create-waiting-room',
  doctorCreate: '.doctor-create',
  doctorName: '.doctor-name',
  doctorFirstName: '.doctor-first-name',
  doctorList: '.doctor-list',
  doctorTitle: '.doctor-title',
  doctorSelect: '.doctor-select',
  roomCreate: '.room-create',
  roomRemove: '.room-remove',
  userCreate: '.user-create',
  userFirstName: 'input.user-first-name',
  userName: 'input.user-name',
  userPhone: 'input.user-phone',
  userList: '.patient-list',
  userStatus: '.user-status',

  // miscs
  poll: null,
  pollInterval: 1000 * 10,
  pollTimeout: 1000 * 60 * 30,

  // timings
  pageTransitionTime: 350,

  // messages
  _errorGeneral: 'Es ist leider ein Problem aufgetreten. Bitte versuchen Sie es später noch einmal.',
  _messageLink: 'Sie wurden in die Warteschlange aufgenommen. Den aktuellen Status finden Sie unter:',
  _messageCall: 'empfängt Sie jetzt. Bitte betreten Sie die Praxis.',
  _messageSuccess: 'Der Patient hat eine SMS erhalten.',
  _patientDelete: 'Der Patient wurde erfolgreich gelöscht.',
  _doctorExists: 'Dieser Arzt ist bereits in der Liste.',
  _doctorMissing: 'Sie müssen mindestens einen Arzt erstellen.',
  _missingField: 'Bitte füllen Sie alle benötigten Felder aus.',
  _statusWaiting: 'Sie befinden sich aktuell in der Warteschlange.',
  _statusReady: 'Sie sind als nächstes dran. Machen Sie sich bitte auf den Weg in die Praxis',
  _waitingTime: 'Wartezeit:',
  _wrongPhone: 'Bitte geben Sie eine gültige Handynummer ein. (z.B. +491758462456)'
}

export default config
