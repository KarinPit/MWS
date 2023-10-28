<template>
    <!-- <div class="col-logo text-center">
        <img class="mws-logo" src="../../public/images/Logo_Moran_new2.png" alt="MWS Logo" />
        <p class="logo-info">מייל: lorem.ipsum@gmail.com</p>
        <p class="logo-info">טלפון: 0587809493</p>
    </div> -->
    <div class="col-form">
        <form @submit.prevent="submitForm">
            <div class="info-div">
                <h2 class="contact-title">רוצים שאצור איתכם קשר? השאירו פרטים ואחזור אליכם</h2>
                <p class="info-p">טלפון: 0587809493</p>
                <p class="info-p">אימייל: pit@gmail.com</p>
            </div>
            <input type="text" v-model="name" placeholder="שם מלא" required />
            <input type="tel" v-model="phone" placeholder="טלפון" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required />
            <input type="email" v-model="email" placeholder="מייל" />
            <textarea type="text" v-model="name" placeholder="הערות" required></textarea>
            <input class="contact-btn" type="submit" value="שלח" />
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            apiUrl: 'https://dry-everglades-63850-370c0019d409.herokuapp.com/api/to-contacts', // Replace with your Strapi API endpoint
        };
    },
    methods: {
        async submitForm() {
            const formData = {
                "data": {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    publishedAt: null
                }
            };

            try {
                const response = await axios.post(this.apiUrl, formData);
                console.log('Form submitted:', response.data);
            } catch (error) {
                console.error('Error submitting form:', error);
            }

            // Clear the form fields after submission
            this.name = '';
            this.phone = '';
            this.email = '';
        },
    },
};
</script>
  