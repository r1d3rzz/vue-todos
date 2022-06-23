import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddTodo from "../views/AddTodo.vue";
import EditTodo from "../views/EditTodo.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/addTodo",
    name: "addTodo",
    component: AddTodo,
  },
  {
    path: "/edit/:id",
    name: "editTodo",
    component: EditTodo,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
