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
import { defineComponent, ref } from "vue";
import AppInput from "@/components/Input.vue";
import TodoList from "@/components/TodoList.vue";

export default defineComponent({
  components: {
    AppInput,
    TodoList,
  },
  setup() {
    const inputText = ref("");
    const todos = ref<{ text: string; completed: boolean }[]>([]);

    const addTodo = () => {
      if (inputText.value.trim() !== "") {
        todos.value.push({
          text: inputText.value,
          completed: false, // Add completed property
        });
        inputText.value = "";
      }
    };

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
