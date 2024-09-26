import { useStore } from '@/stores/todo'; 

export const useTodoStore = () => {
  const store = useStore();
  const { todos } = toRefs(store); // Use toRefs for reactivity
  const inputText = ref(''); 

  const fetchTodos = async () => {
    await store.fetchTodos();
  };

  const addTodo = () => {
    if (inputText.value.trim() !== "") {
      store.addTodo({
        title: inputText.value,
        completed: false 
      }); 
      inputText.value = "";
    }
  };

  const editTodo = (updatedTodo: { id: number, userId: number, title: string, completed: boolean }) => {
    const index = store.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      store.todos[index] = updatedTodo;
    }
  };

  return {
    todos,
    fetchTodos,
    addTodo,
    inputText,
    editTodo
  };
};