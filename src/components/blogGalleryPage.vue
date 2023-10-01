<template>
    <div class="image-gallery">
        <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
            <div class="project-img" v-for="(post, index) in column" :key="index" @mouseover="toggleHovered(index)"
                @mouseout="toggleHovered(-1)">
                <a class="project-name" :href="`/blog/${post.name}`">{{ post.name }}</a>
                <a :href="`/blog/${post.name}`"><img class="gimage" :src="baseUrl + post.imageUrl"
                        alt="designed house example" /></a>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            baseUrl: "http://127.0.0.1:1337",
            posts: [],
            hovered: -1, // Track hover state, initialize to -1 to indicate no hover
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.posts = await this.GetPosts(); // Call the GetProjects method
    },
    computed: {
        imageColumns() {
            const columnCount = 2; // Number of columns
            const columns = [];

            for (let i = 0; i < this.posts.length; i += columnCount) {
                columns.push(this.posts.slice(i, i + columnCount));
            }
            return columns;
        },
    },
    methods: {
        toggleHovered(index) {
            this.hovered = index;
        },
        async GetPosts() {
            const response = await fetch("http://127.0.0.1:1337/api/blogs?populate=*");
            const { data } = await response.json();
            const posts = data.map((post) => ({
                name: post.attributes.title,
                imageUrl: post.attributes.image.data.attributes.url,
            }));
            return posts;
        },
    },
};
</script>
  
<style scoped>
.project-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.project-name {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    background: #edb966;
    width: fit-content;
    height: 3em;
    padding: 0 5em;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.gimage {
    opacity: 100%;
    border-radius: 1em;
    transition: opacity 0.3s ease-in-out;
}

.project-img:hover .project-name,
.hovered {
    opacity: 1;
}

.project-img:hover .gimage {
    opacity: 0.5;
}
</style>
