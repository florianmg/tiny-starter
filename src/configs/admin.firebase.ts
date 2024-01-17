import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_ADMIN_SDK_PRIVATE_KEY?.replace(
        /\\n/g,
        '\n'
      ),
      clientEmail: process.env.FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_ADMIN_SDK_PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_ADMIN_SDK_DATABASE_URL,
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };
