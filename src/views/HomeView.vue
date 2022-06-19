<template>
  <div class="home">
    <div v-for="todo in todos" :key="todo.id">
      <SingleTodo :todo="todo" />
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

    load();

    return { errors, todos };
  },
};
</script>
