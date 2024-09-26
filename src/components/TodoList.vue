<template>
  <div class="todo-list">
    <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="todo-item"
      :class="{ 'completed-item': todo.completed }"
    >
      <div class="todo-left">
        <v-checkbox
          v-model="todo.completed"
          :color="ex4[index % ex4.length]"
          hide-details
        />
        <p :class="{ 'completed-text': todo.completed }">{{ todo.title }}</p>
      </div>
      <div>
        <v-btn
          @click="openEditDialog(index)"
          color="primary"
          icon
          class="edit-delete-btn"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          @click="removeTodo(index)"
          color="error"
          icon
          class="edit-delete-btn"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>

    <v-dialog v-model="editDialogOpen" max-width="500px">
      <v-card>
        <v-card-title>Edit</v-card-title>
        <v-card-text>
          <AppInput
            label="Edit todo:"
            v-model="editedTodoText"
            @keyup.enter="saveEditedTodo"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveEditedTodo">Save</v-btn>
          <v-btn color="error" @click="closeEditDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { useTodoStore } from '@/composables/useTodoStore';
import AppInput from "@/components/Input.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    AppInput,
  },
  props: {
    todos: {
      type: Array as PropType<{ id: number; title: string; completed: boolean }[]>,
      required: true,
    },
  },
  setup(props) {
    const { editTodo } = useTodoStore();

    const editedTodoIndex = ref(-1);
    const editedTodoText = ref("");
    const editDialogOpen = ref(false); // Use ref for editDialogOpen

    const removeTodo = (index: number) => {
      props.todos.splice(index, 1); 
    };

    const openEditDialog = (index: number) => {
      editedTodoIndex.value = index;
      editedTodoText.value = props.todos[index].title; 
      editDialogOpen.value = true; // Update the ref directly
    };

    const closeEditDialog = () => {
      editDialogOpen.value = false; // Update the ref directly
      editedTodoIndex.value = -1;
      editedTodoText.value = "";
    };

    const saveEditedTodo = () => {
      if (editedTodoIndex.value !== -1) {
        editTodo({
          id: props.todos[editedTodoIndex.value].id,
          title: editedTodoText.value,
          completed: props.todos[editedTodoIndex.value].completed
        });
        closeEditDialog();
      }
    };

    return {
      ex4: ["success"],
      editDialogOpen, // Expose the ref
      editedTodoIndex,
      editedTodoText,
      removeTodo,
      openEditDialog,
      closeEditDialog,
      saveEditedTodo,
    };
  }
});
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border: 2px solid lightgray;
  border-radius: 20px;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 15px;
  justify-content: space-between;
}

.completed-item {
  border-color: green;
}

.todo-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo-item p {
  margin: 0;
  transition: all 0.3s ease;
}

.completed-text::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: green;
  transform: translate(0, -50%) scaleX(1);
  transition: transform 0.3s ease;
}

.completed-text:not(.completed)::before {
  transform: translate(0, -50%) scaleX(0);
}

.edit-delete-btn {
  border-radius: 18px;
  margin-inline-start: 5px;
}
</style>
