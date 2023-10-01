<template>
  <div>
    <div class="top-header">
      <h2>לקוחות ממליצים</h2>
      <button id="add-review" class="white_btn" @click="showPopup = true">הוסף ביקורת</button>
    </div>

    <!-- Popup Menu -->
    <div class="centered-popup" v-if="showPopup">
      <!-- Overlay background with click event -->
      <div class="popup-overlay" @click="closePopup"></div>
      <div class="popup-menu">
        <button id="close-btn" @click="closePopup">x</button>
        <div class="popup-content">
          <input type="text" id="customerName" v-model="customerName" placeholder="הכנס שם הלקוח" required>
          <textarea id="reviewText" v-model="reviewText" placeholder="כתוב את ביקורתך כאן" required></textarea>
          <button id="send-btn" class="white_btn" @click="submitReview">שלח!</button>
        </div>
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

<style scoped>
.centered-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(156, 156, 156, 0.5);
  /* Semi-transparent background */
  z-index: 9999;
  /* Ensure the popup appears above other content */
}

.popup-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 40em;
  width: 90%;
  height: 45%;
}

.popup-content {
  text-align: center;
  width: 100%;
}

#customerName {
  width: fit-content;
}

#reviewText {
  width: 80%;
  height: 10em;
  margin: 0 2em;
}

#customerName,
#reviewText {
  border-radius: 0.3em;
}

#close-btn {
  position: absolute;
  top: 10%;
  left: 5%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: none;
  font-size: 1.5em;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 0;
}
</style>
