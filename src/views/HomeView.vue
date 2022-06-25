<template>
  <div class="home">
    <navbar-view @dataFetch="dataFetch" :current="current" />

    <div v-if="todosFilter.length">
      <div v-for="todo in todosFilter" :key="todo.id">
        <SingleTodo :todo="todo" @deleteTodoItem="deleteTodoItem" />
      </div>
    </div>

    <div v-else class="loadingBox">
      <h1>loading...</h1>
    </div>
  </div>
</template>

<script>
import getTodos from "@/composables/getTodos";
import SingleTodo from "@/views/SingleTodo.vue";
import NavbarView from "@/components/NavbarView.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

export default {
  name: "HomeView",
  components: { SingleTodo, NavbarView },
  setup() {
    let current = ref("all");

    let { load, todos, errors } = getTodos();

    let deleteTodoItem = (id) => {
      todos.value = todos.value.filter((todo) => {
        return todo.id !== id;
      });
    };

    let dataFetch = (data) => {
      current.value = data;
    };

    let todosFilter = computed(() => {
      if (current.value === "complete") {
        return todos.value.filter((todo) => {
          return todo.complete;
        });
      }

      if (current.value === "ongoing") {
        return todos.value.filter((todo) => {
          return !todo.complete;
        });
      }

      return todos.value;
    });

    load();

    return { errors, todos, deleteTodoItem, dataFetch, current, todosFilter };
  },
};
</script>

<style scoped>
.loadingBox {
  margin: 150px auto;
}
</style>
