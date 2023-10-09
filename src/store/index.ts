import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import { auth } from '$lib/firebase';
import type { DocumentData } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';

export type UserDataStore = {
  user: User | null;
  loading: boolean;
  data: DocumentData | null;
};

export const authStore: Writable<UserDataStore> = writable({
  user: null,
  loading: true,
  data: {},
} as UserDataStore);

export const authHandler = {
  signup: async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  login: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  logout: async () => {
    await signOut(auth);
  },
};
