<template>
    <div class="info">
        <h3 class="marked-header">פרטי יצירת קשר</h3>
        <p class="contact-p"><img class="p-icons" src="/images/location_black.svg" alt="location black outline logo">lorem 15,
            Zur Moshe</p>
        <p class="contact-p"><img class="p-icons" src="/images/phone_black.svg" alt="phone black outline logo">0587809493</p>
        <p class="contact-p"><img class="p-icons" src="/images/email_black.svg"
                alt="email black outline logo">lorem.ipsum@gmail.com</p>
    </div>
    <div class="social-media">
        <h3 class="marked-header">רשתות חברתיות</h3>
        <img class="social_media-icons" @click="openSocialMedia('facebook')" src="../../public/images/facebook_black.svg"
            alt="facebook black outline logo">
        <img class="social_media-icons" @click="openSocialMedia('instagram')" src="../../public/images/instagram_black.svg"
            alt="instagram black outline logo">
        <img class="social_media-icons" @click="openSocialMedia('whatsapp')" src="../../public/images/whatsapp_black.svg"
            alt="whatsapp black outline logo">
    </div>
</template>
  
<script>
export default {
    methods: {
        openSocialMedia(platform) {
            // Define the logic to open different social media platforms
            switch (platform) {
                case 'facebook':
                    // Replace this with the Facebook URL or custom logic to open Facebook
                    window.open('https://www.facebook.com/', '_blank');
                    break;
                case 'instagram':
                    // Replace this with the Instagram URL or custom logic to open Instagram
                    window.open('https://www.instagram.com/', '_blank');
                    break;
                case 'whatsapp':
                    // Replace this with the WhatsApp URL or custom logic to open WhatsApp
                    window.open('https://api.whatsapp.com/', '_blank');
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
  