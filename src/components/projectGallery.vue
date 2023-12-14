<template>
    <div class="image-gallery" v-if="project && typeof project === 'object'">
        <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
            <div v-for="(image, rowIndex) in column" :key="rowIndex">
                <a @click="showImage(image.index)">
                    <img class="gimage" :src="baseUrl + image.url" alt="designed house example" />
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
            baseUrl: '',
            images: [],
            lightboxVisible: false,
            lightboxIndex: 0,
            lightboxImages: [],
        };
    },
    computed: {
        imageColumns() {
            const columns = [[], []]; // Two columns
            let indexCounter = 0;

            for (let i = 0; i < this.images.length; i++) {
                const image = { ...this.images[i], index: indexCounter++ };
                columns[i % 2].push(image);
            }

            return columns;
        },
    },
    methods: {
        async GetImages() {
            // Use this.project to access the project prop
            return this.project.images.data.map((image) => ({ url: image.attributes.url }));
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
            this.lightboxImages = this.images.map((image) => this.baseUrl + image.url);
        }
    },
};
</script>
  
<style scoped>
.gimage {
    cursor: pointer;
}
</style>
  