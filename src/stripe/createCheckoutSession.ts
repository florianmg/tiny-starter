import { addDoc, collection, onSnapshot } from 'firebase/firestore';

import { db } from '@/configs/client.firebase';
import getStripe from './initializeStripe';

import { collections } from '@/constants/collections.constants';

export async function createCheckoutSession(params: {
  uid: string;
  priceId: string;
}) {
  const { uid, priceId } = params;
  // get sub collection checkout_session in userInfos collection
  const checkoutSessionCollectionRef = collection(
    db,
    collections.userInfos,
    uid,
    collections.checkoutSessions
  );

  // add doc to checkout_session collection
  const checkoutSessionDocumentRef = await addDoc(
    checkoutSessionCollectionRef,
    {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionDocumentRef, async (snap) => {
    const data = snap.data();
    if (data && data.sessionId) {
      // we have a session
      // init Stripe
      const stripe = await getStripe();
      // redirect to Checkout
      stripe?.redirectToCheckout({ sessionId: data.sessionId });
    }
  });
}
