<template>
    <div class="row">
        <footer class="text-center text-lg-start text-white" style="background-color: rgba(48, 79, 91, 255)">
            <div class="container pb-0">
                <section>
                    <!-- Grid row -->
                    <div class="row footer-row">
                        <!-- Grid column -->
                        <!-- <div class="col-md-3 my-auto">
                            <img class="mws-logo" :src=info.logoUrl alt="MWS Logo" />
                        </div> -->
                        <!-- Grid column -->
                        <div class="col-md-3 text-center mt-3">
                            <h6 class="text-uppercase mb-4 font-weight-bold contact-title">צרו קשר</h6>
                            <p class="info-text">{{ info.emailAddress }}</p>
                            <p class="info-text">{{ info.phoneNumber }}</p>
                            <p class="info-text">צור משה</p>
                        </div>

                        <hr class="w-100 clearfix d-md-none" />

                        <div class="col-md-4 text-center mt-3">
                            <h6 class="text-uppercase mb-4 font-weight-bold contact-title">עקבו אחרי</h6>
                            <p><a @click="openFacebook" style="cursor: pointer"><img class="navbar-img"
                                        src="/images/facebook-white.svg" alt="facebook black outline logo"></a></p>
                            <p><a @click="openInstagram" style="cursor: pointer"><img class="navbar-img"
                                        src="/images/instagram-white.svg" alt="instagram black outline logo"></a></p>
                            <p><a @click="openWhatsApp" style="cursor: pointer"><img class="navbar-img"
                                        src="/images/whatsapp-white.svg" alt="whats app black outline logo"></a></p>
                        </div>

                        <hr class="w-100 clearfix d-md-none" />

                        <div class="col-md-5 text-center mt-3">
                            <form class="footer-form" @submit.prevent="submitForm">
                                <p class="contact-title">השאירו פרטים ואחזור אליכם</p>
                                <label for="name">שם מלא</label>
                                <input type="text" v-model="name" placeholder="שם מלא" required />
                                <label for="phone">טלפון</label>
                                <input type="tel" v-model="phone" placeholder="טלפון" pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                                    required />
                                <label for="email">מייל</label>
                                <input type="email" v-model="email" placeholder="מייל" />
                                <input class="contact-btn mainBackground" type="submit" value="שלח" />
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
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

                // Clear the form fields after submission
                this.name = '';
                this.phone = '';
                this.email = '';
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
    const info = {
        emailAddress: eaddress,
        phoneNumber: phonenum,
        logoUrl: logo,
    };
    return info;
}
</script>
  
<style scoped>
.mws-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.footer-row {
    height: fit-content;
    padding: 2em 0 0 0;
}

.text-uppercase p {
    text-align: center;
}

.navbar-img img {
    width: 10em;
    height: 10em;
}

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

.col-form {
    padding: 1em 0;
}

.contact-title {
    width: 100%;
    font-size: 1.3em;
    font-weight: 700;
}

.footer-form {
    z-index: 1;
    border-radius: 0.5em;
    padding-bottom: 3em;
    padding-top: 0;
}

input {
    display: block;
    width: 80%;
    max-width: 30em;
    max-height: 2em;
    height: 10vw;
    text-align: center;
    border: 1px solid grey;
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

.info-text {
    font-size: 1.3em;
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
