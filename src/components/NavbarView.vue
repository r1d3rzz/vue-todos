<template>
  <div class="btnGroup">
    <button>
      <span
        @click="fetchData('all')"
        :class="[current === 'all' ? 'active' : null]"
        >All</span
      >
    </button>
    <button>
      <span
        @click="fetchData('complete')"
        :class="[current === 'complete' ? 'active' : null]"
        >Complete</span
      >
    </button>
    <button>
      <span
        @click="fetchData('ongoing')"
        :class="[current === 'ongoing' ? 'active' : null]"
        >Ongoing</span
      >
    </button>
  </div>
</template>

<script>
export default {
  props: ["current"],
  emits: ["dataFetch"],
  setup(_, context) {
    let fetchData = (data) => {
      context.emit("dataFetch", data);
    };

    return { fetchData };
  },
};
</script>

<style>
.btnGroup > button {
  background-color: #fff;
  border: none;
  color: #fafa;
  cursor: pointer;
  user-select: none;
}

.btnGroup {
  margin-bottom: 20px;
}

.active {
  color: #555;
}
</style>