<script lang="ts">
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';
  import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });

  import { auth, db } from '$lib/firebase';
  import { authStore } from '../store';

  const nonAuthRoutes = ['/'];

  onMount(() => {
    auth.onAuthStateChanged(async (user) => {
      const currentPath = window.location.pathname;

      if (!user && !nonAuthRoutes.includes(currentPath)) {
        window.location.href = '/';
        return;
      }

      if (user && currentPath === '/') {
        window.location.href = '/dashboard';
        return;
      }

      if (!user) return;

      let dataToSetToStore: DocumentData;

      const docRef = doc(db, 'users', user?.uid!);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const useRef = doc(db, 'users', user?.uid!);

        dataToSetToStore = {
          email: user?.email!,
          todos: [],
        };

        await setDoc(useRef, dataToSetToStore, { merge: true });
      } else {
        const userData = docSnap.data();
        dataToSetToStore = userData;
      }

      authStore.update((store) => {
        return {
          ...store,
          user,
          data: dataToSetToStore,
          loading: false,
        };
      });
    });
  });
</script>

<div class="mainContainer">
  <slot />
</div>

<style>
  .mainContainer {
    min-height: 100vh;
    background: linear-gradient(to right, #000428, #000046);
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
  }
</style>
