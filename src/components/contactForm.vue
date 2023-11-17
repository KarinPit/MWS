<template>
    <div class="col-lg-5 col-logo text-center">
        <img class="mws-logo" src={{ info.logoUrl }} alt="MWS Logo" />
        <p class="logo-info">מייל: {{ info.emailAddress }}</p>
        <p class="logo-info">טלפון: {{ info.phoneNumber }}</p>
    </div>
    <div class="col-lg-7 col-form">
        <form @submit.prevent="submitForm">
            <p class="contact-title">רוצים שאצור איתכם קשר? השאירו פרטים ואחזור אליכם</p>
            <label for="name">שם מלא</label>
            <input type="text" v-model="name" placeholder="שם מלא" required />
            <label for="phone">טלפון</label>
            <input type="tel" v-model="phone" placeholder="טלפון" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required />
            <label for="email">מייל</label>
            <input type="email" v-model="email" placeholder="מייל" />
            <input class="contact-btn mainBackground" type="submit" value="שלח" />
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

async function GetContactInfo() {
    const response = await fetch("https://dry-everglades-63850-370c0019d409.herokuapp.com/api/contact-info");
    const logo_response = await fetch("https://dry-everglades-63850-370c0019d409.herokuapp.com/api/logo?populate=*");
    const { data } = await response.json();
    const { data_logo } = await logo_response.json();
    const eaddress = data.attributes.address;
    const phonenum = "0" + data.attributes.phone;
    const logo = data_logo.attributes.image.data.attributes.url;
    const info = {
        emailAddress: eaddress,
        phoneNumber: phonenum,
        logoUrl: logo,
    };
    return info;
}
</script>

<style scoped>
label {
    display: none;
}
</style>
  