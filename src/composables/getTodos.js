import { ref } from "vue";

let getTodos = () => {
  let todos = ref([]);
  let errors = ref("");

  let load = async () => {
    try {
      let res = await fetch("http://localhost:3000/todo");
      if (res.status === 404) {
        throw new Error("url not found");
      }
      let data = await res.json();
      todos.value = data;
    } catch (err) {
      errors.value = err.message;
    }
  };

  return { load, todos, errors };
};

export default getTodos;
