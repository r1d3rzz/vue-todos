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
import Swal from "sweetalert2";
import { db, timestamp } from "@/firebase/config";

export default {
  props: ["id"],

  setup(props) {
    let router = useRouter();

    let title = ref("");
    let detail = ref("");

    let load = async () => {
      let res = await db.collection("todos").doc(props.id).get();
      if (res.status === 404) {
        throw new Error("url not found");
      }
      title.value = res.data().title;
      detail.value = res.data().detail;
    };

    onMounted(() => load());

    let editTodo = async () => {
      if (title.value == "" || detail.value == "")
        return alert("Please fill Input Fields");

      await db
        .collection("todos")
        .doc(props.id)
        .update({
          title: title.value,
          detail: detail.value,
          complete: false,
          created_at: timestamp(),
        })
        .then((_) => {
          router.push({ name: "home" });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been edited",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };

    return { title, detail, editTodo };
  },
};
</script>

<style>
</style>