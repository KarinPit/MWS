<template>
  <div>
    <div class="banner">
      <h2 class="marked-header">לקוחות מספרים</h2>
      <button @click="showPopup = true">הוסף ביקורת</button>
    </div>

    <!-- Popup Menu -->
    <div class="popup-menu" v-if="showPopup">
      <div class="popup-content">
        <label for="customerName">שם הלקוח:</label>
        <input type="text" id="customerName" v-model="customerName" placeholder="הכנס שם הלקוח">
        <label for="reviewText">ביקורת:</label>
        <textarea id="reviewText" v-model="reviewText" placeholder="כתוב את ביקורתך כאן"></textarea>
        <button @click="submitReview">שלח</button>
        <button @click="closePopup">סגור</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showPopup: false,
      customerName: '', // Added field for customer name
      reviewText: '',
      reviewJson: '',
      apiUrl: 'http://127.0.0.1:1337/api/reviews'
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      this.customerName = ''; // Clear customer name
      this.reviewText = '';
      this.reviewDate = '';
    },
    submitReview() {
      this.reviewJson = {
        "data": {
            title: this.customerName,
            content: this.reviewText,
            publishedAt: null
        }
      }
      axios
        .post(this.apiUrl, this.reviewJson)
        .then((reviewJson) => {
          console.log('New entry added:', reviewJson);
          this.closePopup();
          // Handle success, e.g., display a success message or perform other actions
        })
        .catch((error) => {
          console.error('Error adding new entry:', error);
          // Handle errors, e.g., display an error message or perform error-specific actions
        });
    },

  },
};
</script>

<style scoped></style>
