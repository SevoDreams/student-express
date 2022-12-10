<template>
  <div>
    <div v-if="student.name">
      <div v-if="student.present == true" class="alert alert-success">
        <p>Hello {{ student.name }} and welcome</p>
      </div>
      <div v-else class="alert alert-secondary">
        <p>Bye {{ student.name }} and have a nice day</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentMessage",
  props: {
    student: Object,
  },
};
</script>

<style scoped></style>
