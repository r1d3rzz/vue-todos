<template>
  <div class="home">
    <div v-for="todo in todos" :key="todo.id">
      <SingleTodo :todo="todo" @deleteTodoItem="deleteTodoItem" />
    </div>
  </div>
</template>

<script>
import getTodos from "@/composables/getTodos";
import SingleTodo from "@/views/SingleTodo.vue";

export default {
  name: "HomeView",
  components: { SingleTodo },
  setup() {
    let { load, todos, errors } = getTodos();

    let deleteTodoItem = (id) => {
      todos.value = todos.value.filter((todo) => {
        return todo.id !== id;
      });
    };

    load();

    return { errors, todos, deleteTodoItem };
  },
};
</script>
