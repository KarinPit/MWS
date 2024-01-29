<template>
    <div>
        <div class="carousel-images">
            <transition name="fade">
                <img :key="currentImage.key" v-if="urls.mainImageUrl !== ''" :src="currentImage.url"
                    class="carousel-img d-block w-100" alt="woman going down wood stairs">
            </transition>
        </div>
        <div class="carousel-button">
            <button class="prev" @click="showPrevImage">
                <img src="../../public/images/arrow-left.svg">
                <!-- <img src="/images/arrow-left.svg"> -->
            </button>
        </div>
        <div class="carousel-button">
            <button class="next" @click="showNextImage">
                <img src="../../public/images/arrow-right.svg">
            </button>
        </div>
    </div>
</template>
    
<script>
export default {
    data() {
        return {
            baseUrl: '',
            urls: {
                mainImageUrl: '',
                imagesUrl: [],
            },
            currentIndex: 0,
        };
    },
    async created() {
        this.urls = await GetHomeImages();
    },
    methods: {
        async showPrevImage() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            }
            else {
                this.currentIndex = this.urls.imagesUrl.length - 1;
            }
        },
        async showNextImage() {
            if (this.currentIndex < this.urls.imagesUrl.length - 1) {
                this.currentIndex++;
            }
            else {
                this.currentIndex = 0;
            }
        },
    },
    computed: {
        currentImage() {
            return {
                url: this.baseUrl + (this.currentIndex === 0 ? this.urls.mainImageUrl : this.urls.imagesUrl[this.currentIndex]),
                key: this.currentIndex
            };
        },
    },
};

async function GetHomeImages() {
    const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/home-image?populate=*");
    const { data } = await response.json();
    const mainImageUrl = data.attributes.mainImage.data.attributes.url;
    const images = data.attributes.images.data;
    const imagesUrl = images.map((image) => image.attributes.url);
    const urls = {
        mainImageUrl: mainImageUrl,
        imagesUrl: imagesUrl,
    };
    return urls;
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
  