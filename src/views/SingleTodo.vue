<template>
  <div :class="[todo.complete ? 'complete' : null, 'todo']">
    <div class="layout">
      <div>
        <h2
          :class="[todo.complete ? 'headerComplete' : null, 'header']"
          @click="showDetail = !showDetail"
        >
          {{ todo.title }}
        </h2>
      </div>
      <div class="btnGp">
        <span>edit</span>
        <span>delete</span>
        <span :class="[todo.complete ? 'done' : null]" @click="doneBtn(todo)"
          >done</span
        >
      </div>
    </div>
    <p v-if="showDetail">{{ todo.detail }}</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ["todo"],
  setup() {
    let showDetail = ref(false);
    let doneBtn = async (todo) => {
      await fetch("http://localhost:3000/todo/" + todo.id, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          complete: (todo.complete = !todo.complete),
        }),
      });
    };
    return { showDetail, doneBtn };
  },
};
</script>

<style>
.todo {
  width: 400px;
  padding: 10px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid black;
  text-align: start;
  border-left: 7px solid red;
}

.header {
  user-select: none;
  cursor: pointer;
}

.layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btnGp > span {
  padding: 5px 10px;
  margin-right: 10px;
  user-select: none;
  cursor: pointer;
  border: 1px solid blueviolet;
  font-size: 15px;
  transition: 0.2s ease;
}

.complete {
  border-left-color: green;
}

.headerComplete {
  text-decoration: line-through;
  color: rgba(119, 116, 119, 0.509);
}

.done {
  color: #fafa;
}
</style>