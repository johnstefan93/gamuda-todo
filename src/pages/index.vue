<template>
  <div class="main-container">
    <h2 class="top-header-title">My Todo List</h2>
    <AppInput
      label="Enter your text:"
      v-model="inputText"
      @keyup.enter="addTodo"
    />
    <TodoList :todos="todos" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useTodoStore } from '@/composables/useTodoStore'; 
import AppInput from "@/components/Input.vue";
import TodoList from "@/components/TodoList.vue";

export default defineComponent({
  components: {
    AppInput,
    TodoList,
  },
  setup() {
    const { todos, fetchTodos, addTodo, inputText } = useTodoStore();

    onMounted(async () => {
      await fetchTodos();
    });

    return {
      inputText,
      todos,
      addTodo,
    };
  },
});
</script>

<style>
.top-header-title {
  text-align: center;
  margin-bottom: 20px;
}

.main-container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  height: 100vh;
}
</style>