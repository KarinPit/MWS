<template>
    <div id="carouselExampleControls" class="carousel carousel-dark slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
        <div class="carousel-inner">
            <div class="carousel-item active" v-if="urls.mainImageUrl !== ''">
                <img :src="baseUrl + urls.mainImageUrl" class="carousel-img d-block w-100" alt="woman going down wood stairs">
            </div>
            <div class="carousel-item" v-if="urls.mainImageUrl !== ''" v-for="(imageUrl, index) in urls.imagesUrl"
                :key="index">
                <img :src="baseUrl + imageUrl" class="carousel-img d-block w-100" alt="designed house example">
            </div>
        </div>
        <!-- <button id="prev-btn" class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button id="next-btn" class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            baseUrl: 'https://dry-everglades-63850-370c0019d409.herokuapp.com',
            urls: {
                mainImageUrl: '',
                imagesUrl: [],
            },
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.urls = await GetHomeImages();
    },
};

async function GetHomeImages() {
    const response = await fetch("https://dry-everglades-63850-370c0019d409.herokuapp.com/api/home-image?populate=*");
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

