<template>
    <div class="image-gallery">
        <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
            <div class="project-img" v-for="(imageUrl, index) in column" :key="index">
                <h4>שם פרויקט</h4>
                <img class="gimage" :src="baseUrl + imageUrl" alt="designed house example">
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            baseUrl: 'http://127.0.0.1:1337',
            mainImageUrl: [],
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.mainImageUrl = await GetImageUrl();
    },
    computed: {
        imageColumns() {
            const columnCount = 3; // Number of columns
            const columns = [];

            for (let i = 0; i < this.mainImageUrl.length; i += columnCount) {
                columns.push(this.mainImageUrl.slice(i, i + columnCount));
            }
            // console.log(columns)

            return columns;
        },
    },
};

async function GetImageUrl() {
    const response = await fetch("http://127.0.0.1:1337/api/projects?populate=*");
    const { data } = await response.json();
    const imagesUrl = data.map((image) => image.attributes.mainImage.data.attributes.url);
    return imagesUrl;
}
</script>
  