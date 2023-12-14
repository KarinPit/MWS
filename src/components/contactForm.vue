<template>
    <div class="row contact-row beige-background align-items-start">
        <div class="col-lg-2 col-logo text-end my-auto">
            <img class="mws-logo" :src=info.logoUrl alt="MWS Logo" />
        </div>
        <div class="col-lg-5 col-info text-center">
            <p class="contact-title">אפשר גם להתקשר</p>
            <p class="logo-info">מייל - {{ info.emailAddress }}</p>
            <p class="logo-info">טלפון - {{ info.phoneNumber }}</p>
            <p class="contact-title">עקבו אחרי גם ברשתות החברתיות</p>
            <div class="social-media-menu">
                <a class="social-img" @click="openFacebook" style="cursor: pointer"><img src="/images/facebook_black.svg"
                        alt="facebook black outline logo"></a>
                <a class="social-img" @click="openInstagram" style="cursor: pointer"><img src="/images/instagram_black.svg"
                        alt="instagram black outline logo"></a>
                <a class="social-img" @click="openWhatsApp" style="cursor: pointer"><img src="/images/whatsapp_black.svg"
                        alt="whats app black outline logo"></a>
            </div>

        </div>
        <div class="col-lg-5 col-form text-center">
            <form @submit.prevent="submitForm">
                <p class="contact-title">רוצים שאצור איתכם קשר? </p>
                <p class="contact-title">השאירו פרטים ואחזור אליכם</p>
                <label for="name">שם מלא</label>
                <input type="text" v-model="name" placeholder="שם מלא" required />
                <label for="phone">טלפון</label>
                <input type="tel" v-model="phone" placeholder="טלפון" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required />
                <label for="email">מייל</label>
                <input type="email" v-model="email" placeholder="מייל" />
                <input class="contact-btn mainBackground" type="submit" value="שלח" />
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
            apiUrl: 'https://mws-data-280b2464bf34.herokuapp.com/api/to-contacts',
            info: {
                emailAddress: '',
                phoneNumber: [],
                logoUrl: [],
            },
        };
    },
    async created() {
        this.info = await GetContactInfo();
    },

    methods: {
        openWhatsApp() {
            window.open('https://wa.me/972587809493');
        },
        openFacebook() {
            window.open('https://www.facebook.com/MWSStudioStyle');
        },
        openInstagram() {
            window.open('https://www.instagram.com/moran_interior_design/');
        },

        async submitForm() {
            const formData = {
                data: {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    publishedAt: null,
                },
            };

            try {
                const response = await axios.post(this.apiUrl, formData);
                console.log('Form submitted:', response.data);

                // Reset the form
                this.$refs.contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    },
};

async function GetContactInfo() {
    const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/contact-info?populate=*");
    const { data } = await response.json();
    const eaddress = data.attributes.address;
    const phonenum = data.attributes.phone;
    const logo = data.attributes.logo.data.attributes.url;
    console.log(data)
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

.contact-title {
    text-align: center;
}

.col-info {
    padding: 2em 0;
    border-left: 0.3em solid #bdbcbc;
    border-right: 0.3em solid #bdbcbc;
}

.contact-title {
    width: 100%;
    font-size: 1.5em;
    font-weight: 700;
    margin-bottom: 0.5em;
}

form {
    z-index: 1;
    border-radius: 0.5em;
    padding-bottom: 2em;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 5em;
}

input {
    display: block;
    width: 80%;
    max-width: 20em;
    max-height: 2.5em;
    height: 10vw;
    text-align: center;
    border: 1px solid grey;
    /* border-radius: 0.2em; */
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.5em;
    background: white;
    font-size: 1.2em;
}

.contact-btn {
    font-size: 1.2em;
    display: block;
    width: 25vw;
    max-width: 6em;
    margin: auto;
    background: #21252a;
    margin-top: 0.8em;
    color: white;
    border: none;
}

.mws-logo {
    width: 100%;
    /* max-width: 30em; */
    height: auto;
    max-height: 15em;
    object-fit: contain;
}

.logo-info {
    text-align: center;
    margin: auto;
    line-height: 1em;
    font-weight: 300;
    font-size: 1.3em;
    padding-bottom: 1em;
}

.social-media-menu {
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-img {
    width: 3em;
    margin: 0.5em 1em;
    opacity: 60%;
}

@media (max-width: 992px) {
    .col-logo {
        padding: 1em 0;
    }

    .col-info {
        padding: 2em 0;
        border-left: none;
        border-right: none;
        border-top: 0.3em solid #bdbcbc;
        border-bottom: 0.3em solid #bdbcbc;
    }

}

@media (min-width: 1500px) {

    /* .col-logo {
        padding-right: 15em;
    }

    .col-form {
        padding-left: 15em;
    } */
}
</style>
  