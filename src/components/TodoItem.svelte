<script lang="ts">
    export let todo: string;
    export let index: number;
    export let editTodo: (index: number) => void;
    export let removeTodo: (index: number) => void;
</script>

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

<style>
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
</style>
