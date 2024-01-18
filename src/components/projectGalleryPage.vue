<template>
    <h2 v-if="navNames">{{ navNames.Projects }}</h2>
    <div class="image-gallery">
        <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
            <div class="project-box" v-for="(project, index) in column" :key="index" @mouseover="toggleHovered(index)"
                @mouseout="toggleHovered(-1)">
                <a class="project-name" :href="`/projects/${project.name}`">{{ project.name }}</a>
                <a class="project-img" :href="`/projects/${project.name}`"><img class="gimage"
                        :src="baseUrl + project.imageUrl" alt="designed house example" /></a>
            </div>
        </div>
    </div>
</template>
  
<script>
import navNames from './navigation.vue';

export default {
    data() {
        return {
            // baseUrl: "https://mws-data-280b2464bf34.herokuapp.com/",
            baseUrl: "",
            mainProjects: [],
            hovered: -1, // Track hover state, initialize to -1 to indicate no hover
            navNames: null,
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.mainProjects = await this.GetProjects(); // Call the GetProjects method
        this.navNames = await fetchNavNames();
    },
    computed: {
        imageColumns() {
            const columnCount = 3; // Number of columns
            const columns = new Array(columnCount).fill().map(() => []);
            const projects = this.mainProjects;

            for (let i = 0; i < projects.length; i++) {
                columns[i % columnCount].push(projects[i]);
            }

            return columns;
        },
    },
    methods: {
        toggleHovered(index) {
            this.hovered = index;
        },
        async GetProjects() {
            const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/projects?populate=*");
            const { data } = await response.json();
            const projects = data.map((project) => ({
                name: project.attributes.title, // Set project name
                imageUrl: project.attributes.mainImage.data.attributes.url,
            }));
            return projects;
        },
    },
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
</script>
  
<style scoped>

h2 {
    margin: auto;
}
.image-gallery {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    padding: 0;
    margin: 0;
}

.gimage {
    object-fit: cover;
    background: white;
    opacity: 100%;
    transition: opacity 0.3s ease-in-out;
}

.project-box {
    display: flex;
    justify-content: center;
    align-items: center;
    /* Remove fixed width and height */
}

.project-name {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    height: 3em;
    padding: 0;
    font-size: 2em;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.project-box:hover .project-name,
.hovered {
    opacity: 1;
}

.project-box:hover .gimage {
    opacity: 0.3;
}

@media (max-width: 340px),
(min-width: 341px) and (max-width: 575px),
(min-width: 576px) and (max-width: 767px) {
    .image-gallery {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        width: 100%;
    }

    .gimage {
        width: 70vw;
        height: 30em;
        padding: 1em;
        margin-bottom: 2em;
    }
}

@media (min-width: 768px) and (max-width: 991px) {
    .gimage {
        width: 30vw;
        height: 30em;
        padding: 1em;
    }
}

@media (min-width: 992px) {
    .gimage {
        width: 30vw;
        height: 30em;
        padding: 1em;
    }
}
</style>