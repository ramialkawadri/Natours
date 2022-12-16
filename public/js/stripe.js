import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51LgZiRIWnEz5K3oXxGbSKYYZTiJCT3IXL5j29y2BCfMbPop66U4Ydbn2LIv4yQBD4s1GznhjkIfbIyPoztkvNTVp00CA2u26J2'
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    showAlert('error', err);
  }
};
