
<template>
    <div id="big-screens-navbar" class="social-media-icons">
        <a class="icon" @click="openFacebook">
            <img src="/images/facebook_black.svg" alt="facebook icon">
        </a>
        <a class="icon" @click="openInstagram">
            <img src="/images/instagram_black.svg" alt="instagram icon">
        </a>
        <a class="icon" @click="openWhatsApp">
            <img src="/images/whatsapp_black.svg" alt="whatsapp icon">
        </a>
    </div>
    <div class="nav-links">
        <a id="home" class="nav-link active" aria-current="page" href="/">
            <span class="nav-link-span">{{
                navNames.Home }}</span>
        </a>
        <a id="about" class="nav-link" href="/about">
            <span class="nav-link-span">{{ navNames.About
            }}</span>
        </a>
        <a id="projects" class="nav-link" href="/projects">
            <span class="nav-link-span">{{ navNames.Projects
            }}</span>
        </a>
        <a id="blog" class="nav-link" href="/blog">
            <span class="nav-link-span">{{ navNames.Blog
            }}</span>
        </a>
        <a id="reviews" class="nav-link" href="/reviews">
            <span class="nav-link-span">{{ navNames.Reviews
            }}</span>
        </a>
        <a id="contact" class="nav-link" href="/contact">
            <span class="nav-link-span">{{ navNames.Contact
            }}</span>
        </a>
        <a class="nav-link" href="#">
            <span class="nav-link-span">English</span>
        </a>
    </div>
    <div class="logo-icons">
        <a class="icon phone-number" @click="openDialer(phoneNumber)">
            <p>{{ phoneNumber }}</p>
        </a>
        <a class="icon logo-icon" href="/">
            <p>MWS Studio</p>
        </a>
    </div>
    <div class="social-media-icons small-screens-navbar">
        <a class="icon" @click="openFacebook">
            <img src="/images/facebook_black.svg" alt="facebook icon">
        </a>
        <a class="icon" @click="openInstagram">
            <img src="/images/instagram_black.svg" alt="instagram icon">
        </a>
        <a class="icon" @click="openWhatsApp">
            <img src="/images/whatsapp_black.svg" alt="whatsapp icon">
        </a>
    </div>
    <button class="menu-button" @click="toggleMenu">
        <img src="../../public/images/list.svg"></button>
</template>


<script>
export default {
    data() {
        return {
            navNames: [], // Initialize navNames as null
            phoneNumber: '',
            isMenuOpen: false,
        };
    },
    async created() {
        this.navNames = await fetchNavNames();
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
        openDialer(number) {
            const telLink = `tel:${number}`;
            window.open(telLink, '_blank');
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            const navLinks = document.querySelector('.nav-links');
            const navbars = document.querySelector('.navbars');
            if (navLinks) {
                if (this.isMenuOpen) {
                    navLinks.classList.add('nav-links-open');
                    navbars.classList.add('navbars-open');
                } else {
                    navLinks.classList.remove('nav-links-open');
                    navbars.classList.remove('navbars-open');
                }
            }
        },
    },
};

async function fetchNavNames() {
    try {
        const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/navigation-name");
        const { data } = await response.json();
        return data.attributes
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
</script>

