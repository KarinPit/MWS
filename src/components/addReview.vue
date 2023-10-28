<template>
  <div>
    <div class="top-header">
      <h2>לקוחות ממליצים</h2>
      <button id="add-review" class="white_btn mainBackground" @click="showPopup = true">הוסף ביקורת</button>
    </div>

    <!-- Use the <transition> element for fade-in effect -->
    <transition name="fade" appear>
      <div v-if="showPopup">
        <!-- Overlay background with click event -->
        <div class="popup-overlay" @click="closePopup"></div>
        <div class="popup-menu">
          <button type="button" id="close-btn" @click="closePopup" class="btn-close" aria-label="Close"></button>
          <div class="popup-content">
            <input type="text" id="customerName" v-model="customerName" placeholder="הכנס שם הלקוח" required>
            <textarea id="reviewText" v-model="reviewText" placeholder="כתוב את ביקורתך כאן" required></textarea>
            <button id="send-btn" class="white_btn mainBackground" @click="submitReview">שלח!</button>
          </div>
        </div>
      </div>
    </transition>
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
      apiUrl: 'https://dry-everglades-63850-370c0019d409.herokuapp.com/api/reviews'
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
/* Add the fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
  border-radius: 0.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 35em;
  width: 90%;
  height: fit-content;
  padding: 2em 1em;
}

.popup-content {
  text-align: center;
  width: 100%;
}

#customerName {
  width: 20em;
  border-radius: 0.3em;
  background: rgb(232, 232, 232);
  border: none;
  font-size: 1.2em;
}

#reviewText {
  width: 20em;
  height: 10em;
  border-radius: 0.5em;
  border: none;
  text-align: center;
  background: rgb(232, 232, 232);
  font-size: 1.2em;
  padding: 1em;
  margin: 0;
}

/* textarea::placeholder {
} */

#close-btn {
  position: absolute;
  top: 10%;
  left: 5%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: none;
  font-size: 1em;
  --bs-btn-close-focus-shadow: none;
}

#send-btn {
  display: block !important;
  margin: 0.5em auto;
  margin-bottom: 0;
}


.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 0;
}
</style>
