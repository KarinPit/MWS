<template>
    <div class="image-gallery" v-if="project && typeof project === 'object'">
        <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
            <div class="project-img" v-for="(image, index) in column" :key="index">
                <img class="gimage" :src="baseUrl + image" alt="designed house example" />
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        project: Object,
    },
    data() {
        return {
            baseUrl: "http://127.0.0.1:1337",
            images: [], // Initialize the images array here
        };
    },
    computed: {
        imageColumns() {
            const columns = [];
            const imagesPerColumn = Math.ceil(this.images.length / 2); // Two columns

            for (let colIndex = 0; colIndex < 2; colIndex++) { // Always two columns
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
    },
    async created() {
        if (this.project && typeof this.project === 'object') {
            // Call the GetImages method to set the images data property
            this.images = await this.GetImages();
        }
    },
};
</script>
  
<style scoped></style>
  