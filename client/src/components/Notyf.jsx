import { Notyf } from 'notyf';

const notyf = new Notyf({
  duration: 5000,
  position: {
    x: 'right',
    y: 'top',
  },
  ripple: true,
  dismissible: true,
});

export default notyf;
