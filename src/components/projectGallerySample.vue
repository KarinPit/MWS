<template>
    <div class="image-gallery">
        <div class="project-img" v-for="(project, index) in mainProjects" :key="index" @mouseover="toggleHovered(index)"
            @mouseout="toggleHovered(-1)">
                <a class="project-name" v-if="project.publishStatus === 'selected'" :href="`/projects/${project.name}`">{{
                    project.name }}</a>
                <a :href="`/projects/${project.name}`"><img class="gimage" v-if="project.publishStatus === 'selected'"
                        :src="baseUrl + project.imageUrl" alt="designed house example" /></a>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            baseUrl: "http://127.0.0.1:1337",
            mainProjects: [],
            hovered: -1, // Track hover state, initialize to -1 to indicate no hover
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.mainProjects = await this.GetProjects(); // Call the GetProjects method
    },
    methods: {
        toggleHovered(index) {
            this.hovered = index;
        },
        async GetProjects() {
            const response = await fetch("http://127.0.0.1:1337/api/projects?populate=*");
            const { data } = await response.json();
            const projects = data.map((project) => ({
                name: project.attributes.title, // Set project name
                imageUrl: project.attributes.mainImage.data.attributes.url,
                publishStatus: project.attributes.publishStatus.data[0].attributes.title,
            }));
            return projects;
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
    width: fit-content;
    height: 3em;
    padding: 0;
    font-size: 1.8em;
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
    opacity: 0.3;
}
</style>
