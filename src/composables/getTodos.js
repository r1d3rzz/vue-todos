import { ref } from "vue";
import { db } from "@/firebase/config";

let getTodos = () => {
  let todos = ref([]);
  let errors = ref("");

  let load = () => {
    try {
      let res = db
        .collection("todos")
        .orderBy("created_at", "desc")
        .onSnapshot((snap) => {
          todos.value = snap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
        });
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
