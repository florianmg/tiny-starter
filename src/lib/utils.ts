import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { appConfig } from '@/configs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else {
    message = 'An unknown error occurred';
    console.log('unreadable error message: ', error);
  }

  return message;
};

export const getI18nFirebaseErrorKey = (error: unknown): string => {
  if (error && typeof error === 'object' && 'code' in error) {
    return `firebase:errors.${error.code}`;
  }

  return getErrorMessage(error);
};

export const isInFreeTrial = (userCreationTime: string | undefined) => {
  if (!userCreationTime) return false;

  const today = new Date();
  const userCreationDate = new Date(userCreationTime);
  const diffInMilliseconds = today.getTime() - userCreationDate.getTime();
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
  return diffInDays <= appConfig.freeTrialDays;
};
