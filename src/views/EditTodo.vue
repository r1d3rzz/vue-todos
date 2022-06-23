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
      <span @click="editTodo">Edit</span>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

export default {
  props: ["id"],

  setup(props) {
    let router = useRouter();

    let title = ref("");
    let detail = ref("");

    let load = async () => {
      let res = await fetch("http://localhost:3000/todo/" + props.id);
      if (res.status === 404) {
        throw new Error("url not found");
      }
      let data = await res.json();
      title.value = data.title;
      detail.value = data.detail;
    };

    onMounted(() => load());

    let editTodo = () => {
      if (title.value == "" && detail.value == "")
        return alert("Please fill Input Fields");

      fetch("http://localhost:3000/todo/" + props.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.value,
          detail: detail.value,
          complete: false,
        }),
      }).then((_) => router.push({ name: "home" }));
    };

    return { title, detail, editTodo };
  },
};
</script>

<style>
</style>