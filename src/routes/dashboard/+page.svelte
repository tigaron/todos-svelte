<script lang="ts">
  let todoList = ['Drink water', 'Eat food', 'Sleep'];
  let currentTodo = '';
  let error = false;

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
</script>

<div class="mainContainer">
  <div class="headerContainer">
    <h1>Todo List</h1>
    <div class="headerButtons">
      <button
        ><i class="fa-regular fa-floppy-disk" />
        <p>Save</p></button
      >
      <button
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
      <div class="todo">
        <p>
          {index + 1}. {todo}
        </p>
        <div class="actions">
          <button on:click={() => editTodo(index)}>
            <i class="fa-regular fa-pen-to-square" />
          </button>
          <button on:click={() => removeTodo(index)}> <i class="fa-regular fa-trash-can" /></button>
        </div>
      </div>
    {/each}
  </main>
  <div class={'enterTodo' + (error ? ' errorBorder' : '')}>
    <input bind:value={currentTodo} type="text" placeholder="Enter a todo list" />
    <button on:click={addTodo}>Add</button>
  </div>
</div>

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

  .todo {
    border-left: 1px solid cyan;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .actions button {
    background: transparent;
    border: none;
    color: white;
    padding: 0;
    font-size: 1.3rem;
    cursor: pointer;
  }

  .actions button:hover {
    color: coral;
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
</style>
