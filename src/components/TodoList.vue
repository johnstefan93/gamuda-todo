<template>
  <div class="todo-list">
    <div
      v-for="(todo, index) in todos"
      :key="index"
      class="todo-item"
      :class="{ 'completed-item': todo.completed }"
    >
      <div class="todo-left">
        <v-checkbox
          v-model="todo.completed"
          :color="ex4[index % ex4.length]"
          hide-details
        />
        <p :class="{ 'completed-text': todo.completed }">{{ todo.text }}</p>
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
import AppInput from "@/components/Input.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    AppInput,
  },
  props: {
    todos: {
      type: Array as PropType<{ text: string; completed: boolean }[]>,
      required: true,
    },
  },
  data() {
    return {
      ex4: ["success"],
      editDialogOpen: false,
      editedTodoIndex: -1,
      editedTodoText: "",
    };
  },
  methods: {
    removeTodo(index: number) {
      this.todos.splice(index, 1);
    },
    openEditDialog(index: number) {
      this.editedTodoIndex = index;
      this.editedTodoText = this.todos[index].text;
      this.editDialogOpen = true;
    },
    closeEditDialog() {
      this.editDialogOpen = false;
      this.editedTodoIndex = -1;
      this.editedTodoText = "";
    },
    saveEditedTodo() {
      if (this.editedTodoIndex !== -1) {
        this.todos[this.editedTodoIndex].text = this.editedTodoText;
        this.closeEditDialog();
      }
    },
  },
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
