
<template>
    <nav :class="{ 'bg-white': isScrolled }" class="navbar navbar-expand-md">
        <div class="container-fluid">
            <div>
                <a class="logo-name" :class="{ 'blue-logo': isScrolled }" href="/">MWS Studio</a>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="nav-text">
                <a class="nav-link" @click="openDialer(phoneNumber)" style="cursor: pointer">{{ phoneNumber }}</a>
                <a class="facebook-icon navbar-img" @click="openFacebook" style="cursor: pointer"><img src="/images/facebook_black.svg"
                        alt="facebook black outline logo"></a>
                <a class="navbar-img" @click="openInstagram" style="cursor: pointer"><img src="/images/instagram_black.svg"
                        alt="instagram black outline logo"></a>
                <a class="navbar-img" @click="openWhatsApp" style="cursor: pointer"><img src="/images/whatsapp_black.svg"
                        alt="whats app black outline logo"></a>
                <!-- <a class="navbar-brand" href="/"><span id="brand-bold">MWS</span> Studio</a> -->
            </div>
            <div class="collapse navbar-collapse" id="navbarNav" v-if="navNames">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a id="home" class="nav-link active" aria-current="page" href="/"><span class="nav-link-span">{{
                            navNames.Home }}</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="about" class="nav-link" href="/about"><span class="nav-link-span">{{ navNames.About
                        }}</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="projects" class="nav-link" href="/projects"><span class="nav-link-span">{{ navNames.Projects
                        }}</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="blog" class="nav-link" href="/blog"><span class="nav-link-span">{{ navNames.Blog
                        }}</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="reviews" class="nav-link" href="/reviews"><span class="nav-link-span">{{ navNames.Reviews
                        }}</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="contact" class="nav-link" href="/contact"><span class="nav-link-span">{{ navNames.Contact
                        }}</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><span class="nav-link-span">English</span></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
import Footer from './footer.vue';
export default {
    data() {
        return {
            isScrolled: false,
            navNames: null, // Initialize navNames as null
            phoneNumber: '',
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    async created() {
        this.navNames = await fetchNavNames();
        this.phoneNumber = await getPhoneNumber();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.isScrolled = window.scrollY > 0;
        },
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
    },

    components: {
        Footer,
    }
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

async function getPhoneNumber() {
    try {
        const phoneNumber = (await Footer.data().GetContactInfo()).phoneNumber;
        return phoneNumber
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
</script>


<style scoped>
.navbar {
    transition: background-color 0.5s ease-in-out;
}

.navbar-nav .nav-item .nav-link:hover {
    background-color: #A0BBC7;
}
</style>
