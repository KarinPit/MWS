
<template>
    <nav :class="{ 'bg-white': isScrolled }" class="navbar navbar-expand-md">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="nav-text">
                <a class="nav-text-element" @click="updateClipboard" style="cursor: pointer">{{ phonenum }}</a>
                <a class="navbar-img" @click="openFacebook" style="cursor: pointer"><img src="/images/facebook_black.svg"
                        alt="facebook black outline logo"></a>
                <a class="navbar-img" @click="openInstagram" style="cursor: pointer"><img
                        src="../../public/images/instagram_black.svg" alt="instagram black outline logo"></a>
                <a class="navbar-img" @click="openWhatsApp" style="cursor: pointer"><img
                        src="../../public/images/whatsapp_black.svg" alt="whats app black outline logo"></a>
                <!-- <a class="navbar-brand" href="/"><span id="brand-bold">MWS</span> Studio</a> -->
            </div>
            <!-- <div class="brand-row text-center">
                <a class="navbar-brand-row" href="/"><span id="brand-bold">MWS</span> Studio</a>
            </div> -->
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a id="home" class="nav-link active" aria-current="page" href="/"><span
                                class="nav-link-span">בית</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="about" class="nav-link" href="/about"><span class="nav-link-span">עלי</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="projects" class="nav-link" href="/projects"><span class="nav-link-span">פרויקטים</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="blog" class="nav-link" href="/blog"><span class="nav-link-span">בלוג</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="reviews" class="nav-link" href="/reviews"><span class="nav-link-span">לקוחות
                                ממליצים</span></a>
                    </li>
                    <li class="nav-item">
                        <a id="contact" class="nav-link" href="/contact"><span class="nav-link-span">צור קשר</span></a>
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
export default {
    data() {
        return {
            isScrolled: false,
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
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
        updateClipboard() {
            navigator.clipboard.writeText('0587809493');
        },
        openMail() {
            window.location.href = 'mailto:karinpitlik@gmail.com?subject=&body=';
        },
    },
};

async function GetContactInfo() {
    const response = await fetch("https://dry-everglades-63850-370c0019d409.herokuapp.com/api/contact-info");
    const { data } = await response.json();
    const phonenum = "0" + data.attributes.phone;
    return phonenum;
}
</script>

<style scoped>
.navbar {
    transition: background-color 0.5s ease-in-out;
}

.navbar-nav .nav-item .nav-link:hover {
    background-color: black;
    color: white;
}
</style>
