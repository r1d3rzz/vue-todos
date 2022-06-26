<template>
  <div :class="[todo.complete ? 'complete' : null, 'todo']">
    <div class="layout">
      <div>
        <h3
          :class="[todo.complete ? 'headerComplete' : null, 'header']"
          @click="showDetail = !showDetail"
        >
          {{ todo.title }}
        </h3>
      </div>
      <div class="btnGp">
        <span class="editBtn">
          <router-link :to="{ name: 'editTodo', params: { id: todo.id } }">
            edit
          </router-link>
        </span>
        <span @click="deleteTodo(todo)" class="deleteBtn">delete</span>
        <span
          :class="[todo.complete ? 'done' : null, 'doneBtn']"
          @click="doneBtn(todo)"
          >done</span
        >
      </div>
    </div>
    <p v-if="showDetail">{{ todo.detail }}</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Swal from "sweetalert2";
import { db } from "@/firebase/config";

export default {
  props: ["todo"],
  emits: ["deleteTodoItem"],
  setup(_, context) {
    let showDetail = ref(false);
    let doneBtn = async (todo) => {
      await db
        .collection("todos")
        .doc(todo.id)
        .update({
          complete: (todo.complete = !todo.complete),
        });
    };

    let deleteTodo = (todo) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          db.collection("todos")
            .doc(todo.id)
            .delete()
            .then(() => {
              context.emit("deleteTodoItem", todo.id);
            });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    };

    return { showDetail, doneBtn, deleteTodo };
  },
};
</script>

<style>
.todo {
  width: 320px;
  padding: 5px;
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
  font-size: 10px;
  transition: 0.2s ease;
}

.editBtn:hover {
  background-color: green;
  color: white;
}

.editBtn > a {
  text-decoration: none;
  color: inherit;
}

.deleteBtn:hover {
  background-color: red;
  color: white;
}

.doneBtn:hover {
  background-color: blue;
  color: white;
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