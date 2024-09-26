import { defineStore } from 'pinia';

export const useStore = defineStore('todoStore', {
  state: () => ({
    todos: [] as { userId: number, id: number, title: string, completed: boolean }[], 
  }),
  getters: {
    getTodos: (state) => state.todos, 
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const   
        data = await response.json();
        this.todos = data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    addTodo(newTodo: { title: string, completed: boolean }) {
      this.todos.unshift({
        ...newTodo,
        userId: 1, 
        id: Date.now(), 
      }); 
    }
  },
});