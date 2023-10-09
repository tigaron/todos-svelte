<script lang="ts">
  import { doc, setDoc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import { authHandler, authStore } from '../../store';
  import TodoItem from '../../components/TodoItem.svelte';

  let todoList: string[] = [];
  let currentTodo = '';
  let loading = false;
  let error = false;

  authStore.subscribe((store) => {
    todoList = store?.data?.todos;
  });

  function addTodo() {
    error = false;

    if (!currentTodo) {
      error = true;
      return;
    }

    todoList = [...todoList, currentTodo];
    currentTodo = '';
  }

  function editTodo(index: number) {
    let newTodoList = todoList.filter((_todo, i) => i !== index);

    currentTodo = todoList[index];

    todoList = newTodoList;
  }

  function removeTodo(index: number) {
    todoList = todoList.filter((_todo, i) => i !== index);
  }

  async function saveTodo() {
    error = false;
    loading = true;

    try {
      const userRef = doc(db, 'users', $authStore?.user?.uid!);
      await setDoc(
        userRef,
        {
          todos: todoList,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
      error = true;
    } finally {
      loading = false;
    }
  }
</script>

{#if !$authStore.loading}
  <div class="mainContainer">
    <div class="headerContainer">
      <h1>Todo List</h1>
      <div class="headerButtons">
        <button on:click={saveTodo} disabled={loading}>
          {#if loading}
            <i class="fa-solid fa-spinner spin" />
          {:else}
            <i class="fa-regular fa-floppy-disk" />
            <p>Save</p>
          {/if}</button
        >
        <button on:click={authHandler.logout}
          ><i class="fa-solid fa-right-from-bracket" />
          <p>Logout</p></button
        >
      </div>
    </div>
    <main>
      {#if todoList.length === 0}
        <p>You have nothing to do!</p>
      {/if}
      {#each todoList as todo, index}
        <TodoItem todo={todo} index={index} editTodo={editTodo} removeTodo={removeTodo} />
      {/each}
    </main>
    <div class={'enterTodo' + (error ? ' errorBorder' : '')}>
      <input bind:value={currentTodo} type="text" placeholder="Enter a todo list" />
      <button on:click={addTodo}>Add</button>
    </div>
  </div>
{/if}

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .headerButtons {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .headerContainer button {
    background: #003c5b;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .headerContainer button i {
    font-size: 1.1rem;
  }

  .headerContainer button:hover {
    opacity: 0.7;
  }

  main {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 8px;
  }

  .errorBorder {
    border-color: coral !important;
  }

  .enterTodo {
    display: flex;
    align-items: stretch;
    border: 1px solid #0891b2;
  }

  .enterTodo input {
    background: transparent;
    border: none;
    padding: 14px;
    color: white;
    flex: 1;
  }

  .enterTodo input:focus {
    outline: none;
  }

  .enterTodo button {
    padding: 0 20px;
    background: #003c5b;
    border: none;
    color: cyan;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;
  }

  .enterTodo button:hover {
    background: transparent;
  }

  .spin {
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
