<template>
    <div class="image-gallery" v-if="project && typeof project === 'object'">
        <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
            <div class="project-img" v-for="(image, index) in column" :key="index">
                <a @click="showImage(index)">
                    <img class="gimage" :src="baseUrl + image" alt="designed house example" />
                </a>
            </div>
        </div>

        <vue-easy-lightbox :visible="lightboxVisible" :imgs="lightboxImages" :index="lightboxIndex"
            @hide="hideLightbox"></vue-easy-lightbox>
    </div>
</template>
  
<script>
import VueEasyLightbox from 'vue-easy-lightbox';

export default {
    components: {
        VueEasyLightbox,
    },
    props: {
        project: Object,
    },
    data() {
        return {
            baseUrl: 'http://127.0.0.1:1337',
            images: [], // Initialize the images array here
            lightboxVisible: false,
            lightboxIndex: 0,
            lightboxImages: [],
        };
    },
    computed: {
        imageColumns() {
            const columns = [];
            const imagesPerColumn = Math.ceil(this.images.length / 2); // Two columns

            for (let colIndex = 0; colIndex < 2; colIndex++) {
                columns.push(this.images.slice(colIndex * imagesPerColumn, (colIndex + 1) * imagesPerColumn));
            }
            return columns;
        },
    },
    methods: {
        async GetImages() {
            // Use this.project to access the project prop
            return this.project.attributes.images.data.map((image) => image.attributes.url);
        },
        showImage(index) {
            this.lightboxIndex = index;
            this.lightboxVisible = true;
        },
        hideLightbox() {
            this.lightboxVisible = false;
        },
    },
    async created() {
        if (this.project && typeof this.project === 'object') {
            // Call the GetImages method to set the images data property
            this.images = await this.GetImages();
            this.lightboxImages = this.images.map((image) => ({ src: this.baseUrl + image }));
        }
    },
};
</script>
  
<style scoped>
.gimage {
    cursor: pointer;
}
</style>
  