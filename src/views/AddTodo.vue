<template>
  <div class="addTodo">
    <div class="inputBox">
      <label for="title">TItle</label>
      <input type="text" id="title" v-model="title" />
    </div>

    <div class="inputBox">
      <label for="Detail">Detail</label>
      <input type="text" id="Detail" v-model="detail" />
    </div>

    <div class="buttonBox">
      <span @click="createTodo">Create</span>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  setup() {
    let title = ref("");
    let detail = ref("");

    let router = useRouter();

    let createTodo = () => {
      if (title.value == "" && detail.value == "")
        return alert("Please fill Input Fields");

      fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.value,
          detail: detail.value,
          complete: false,
        }),
      }).then((_) => {
        router.push({ name: "home" });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    };

    return { title, detail, createTodo };
  },
};
</script>

<style>
.addTodo {
  max-width: 300px;
  margin: 0 auto;
  text-align: start;
}

.inputBox {
  margin: 30px auto;
}

.buttonBox {
  text-align: start;
}

.buttonBox > span {
  border: 1px solid blue;
  padding: 5px 10px;
  font-size: 12px;
  transition: all 0.2s ease;
  user-select: none;
  cursor: pointer;
}

.buttonBox > span:hover {
  background-color: blue;
  color: white;
}

label {
  display: block;
}

input {
  border: none;
  border-bottom: 1px solid green;
  width: 80%;
  outline: none;
  font-size: 22px;
  padding: 3px 5px;
}
</style>