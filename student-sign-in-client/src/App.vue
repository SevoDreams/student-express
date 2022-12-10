<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table
      v-bind:students="students"
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student="deleteStudent"
    ></student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import NewStudentForm from "./components/NewStudentForm.vue";
import StudentMessage from "./components/StudentMessage.vue";
import StudentTable from "./components/StudentTable.vue";

export default {
  name: "App",
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable,
  },
  data() {
    return {
      students: [],
      mostRecentStudent: {},
    };
  },
  mounted() {
    // runs as the app is created and being loaded onto the page
    this.updateStudents();
  },
  methods: {
    updateStudents() {
      this.$student_api
        .getAllStudents()
        .then((students) => {
          this.students = students;
        })
        .catch(() => alert("Unable to fetch student list"));
    },
    newStudentAdded(student) {
      this.$student_api
        .addStudent(student)
        .then(() => {
          this.updateStudents(); // to prevent needing manual reload to see data
        })
        .catch((err) => {
          let msg = err.response.data.join(",");
          alert("Error adding student\n" + msg);
        });
    },
    studentArrivedOrLeft(student, present) {
      student.present = present; // update present value since it wasnt updated prior to emitting
      this.$student_api
        .updateStudent(student)
        .then(() => {
          this.mostRecentStudent = student;
          this.updateStudents();
        })
        .catch(() => alert("Unable to update students"));
    },
    deleteStudent(student) {
      this.$student_api
        .deleteStudent(student.id)
        .then(() => {
          this.updateStudents();
          this.mostRecentStudent = {};
        })
        .catch(() => alert("Unable to delete student"));
    },
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>
