<template>
  <button class="add-review-button" @click="showPopup = true">הוסף ביקורת</button>
  <transition name="fade" appear>
    <div v-if="showPopup">
      <div class="popup-overlay" @click="closePopup"></div>
      <div class="popup-menu">
        <button type="button" id="close-btn" @click="closePopup" class="btn-close" aria-label="Close"></button>
        <div class="popup-content">
          <input type="text" id="customerName" v-model="customerName" placeholder="הכנס שם הלקוח" required>
          <textarea id="reviewText" v-model="reviewText" placeholder="כתוב את ביקורתך כאן" required></textarea>
          <button id="send-btn" class="white-btn mainBackground" @click="submitReview">שלח!</button>
        </div>
      </div>
    </div>
  </transition>
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
      apiUrl: 'https://mws-data-280b2464bf34.herokuapp.com/api/reviews'
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      this.customerName = ''; // Clear customer name
      this.reviewText = '';
    },
    submitReview() {
      if (this.customerName.trim() === '' || this.reviewText.trim() === '') {
        alert('שם הלקוח והביקורת חייבים להיות מלאים');
        return;
      }

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
