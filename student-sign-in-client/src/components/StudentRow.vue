<template>
  <tr
    v-bind:key="student.starID"
    v-bind:class="{
      present: student.present,
      absent: !student.present,
    }"
  >
    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td>
      <!-- Using an input as my last data cell -->
      <input
        type="checkbox"
        v-bind:checked="student.present"
        v-on:change="arrivedOrLeft(student, $event.target.checked)"
      />
    </td>
    <td v-show="edit">
      <img v-on:click="deleteStudent" src="@/assets/delete.png" alt="" />
    </td>
  </tr>
</template>

<script>
export default {
  name: "StudentRow",
  emits: ["student-arrived-or-left", "delete-student"],
  props: {
    student: Object,
    edit: Boolean,
  },
  methods: {
    arrivedOrLeft(student, present) {
      this.$emit("student-arrived-or-left", student, present);
    },
    deleteStudent() {
      if (confirm(`Delete ${this.student.name}?`)) {
        this.$emit("delete-student", this.student);
      }
      // 'Confirm' is basically a prompt which returns your answer as a boolean
    },
  },
};
</script>

<style scoped>
.present {
  color: gray;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}

img {
  height: 47px;
}

tr {
  height: 50px;
}
</style>
