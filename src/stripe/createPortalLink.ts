import { httpsCallable } from 'firebase/functions';

import { firebaseFunctions } from '@/configs/client.firebase';

type PortalLink = {
  configuration: string;
  created: number;
  customer: string;
  flow: any;
  id: string;
  livemode: boolean;
  locale: string;
  object: string;
  on_behalf_of: any;
  return_url: string;
  url: string;
};

const createPortalLink = async (): Promise<string> => {
  const functionRef = httpsCallable(
    firebaseFunctions,
    'ext-firestore-stripe-payments-createPortalLink'
  );
  const { data } = await functionRef({
    returnUrl: window.location.origin,
  });

  return (data as PortalLink).url;
};

export { createPortalLink };
