## Informations

- NextJS 14 (Page router)
- TailwindCSS + DaisyUI
- React Hook Forms + Zod
- Typescript / ESLint / Prettier

## Configuration

Duplicate the `.env.example` file and name it `.env.local`

2. [Configure Firebase](#configure-firebase)
3. [Configure Stripe](#configure-stripe)
4. [Run the project](#run-the-project)

Happy Hacking

## Configure Firebase

#### Create the firebase project

1. Go to [firebase console](https://console.firebase.google.com/)
2. Create a new project
3. Inside the new project create a new web application (I don't use firebase hosting but you can)
4. Add SDK Firebase values to the `.env.local`. Variables starting by `NEXT_PUBLIC_FIREBASE_CLIENT_`

#### Add Auth service

1. Go to left menu `Create > Authentification > Start`
2. Add providers : Email/Password and Google (you can add more but you will need to add them in login/register forms)

#### Add Firestore service

1. Go to left menu `Create > Cloud Firestore > Create database`. Select a region and start in test mode. You can updates security rules later.

#### Configure Firestore Admin SDK

1. Generate a new private key by going to `Project parameters > Service Account > Generate new private key` (always keep secret)
2. Report values in your `.env.local` file.

### Configure Stripe

To configure Stripe, follow these steps:

1. Step 1
2. Step 2
3. Step 3

### Run the project

To run the project, execute the following commands:
