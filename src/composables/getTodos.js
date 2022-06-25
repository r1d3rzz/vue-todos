import { ref } from "vue";
import { db } from "@/firebase/config";

let getTodos = () => {
  let todos = ref([]);
  let errors = ref("");

  let load = async () => {
    try {
      let res = await db
        .collection("todos")
        .orderBy("created_at", "desc")
        .get();
      todos.value = res.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
    } catch (err) {
      errors.value = err.message;
    }
  };

  return { load, todos, errors };
};

export default getTodos;
