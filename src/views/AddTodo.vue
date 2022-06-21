<template>
  <div class="addTodo">
    <div class="inputBox">
      <label for="title">TItle</label>
      <input type="text" id="title" />
    </div>

    <div class="inputBox">
      <label for="Detail">Detail</label>
      <input type="text" id="Detail" />
    </div>

    <div class="buttonBox">
      <span>Create</span>
    </div>
  </div>
</template>

<script>
export default {};
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