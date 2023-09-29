<template>
    <div class="contact-area">
        <div class="logo-col">
            <img class="mws-logo" src="../../public/images/Logo_Moran_new2.png" alt="MWS Logo" />
            <p class="logo-info">מייל: lorem.ipsum@gmail.com</p>
            <p class="logo-info">טלפון: 0587809493</p>
        </div>
        <div class="contact-div">
            <form @submit.prevent="submitForm">
                <p class="contact-title marked-header">צרו קשר</p>
                <input type="text" v-model="name" placeholder="שם מלא" required />
                <input type="tel" v-model="phone" placeholder="טלפון" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required />
                <input type="email" v-model="email" placeholder="מייל" />
                <input class="contact-btn" type="submit" value="שלח" />
            </form>
        </div>
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
            apiUrl: 'http://127.0.0.1:1337/api/to-contacts', // Replace with your Strapi API endpoint
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
  