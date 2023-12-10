<template>
    <div class="image-gallery">
        <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
            <div class="project-img" v-for="(project, index) in column" :key="index" @mouseover="toggleHovered(index)"
                @mouseout="toggleHovered(-1)">
                <a class="project-name" :href="`/projects/${project.name}`">{{ project.name }}</a>
                <div class="image-container">
                    <a :href="`/projects/${project.name}`"><img class="gimage" :src="baseUrl + project.imageUrl"
                            alt="designed house example" /></a>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            baseUrl: "",
            mainProjects: [],
            hovered: -1,
        };
    },
    async created() {
        this.mainProjects = await this.GetProjects();
    },
    computed: {
        imageColumns() {
            const columnCount = 3;
            const columns = [];

            for (let i = 0; i < columnCount; i++) {
                columns.push([]);
            }

            this.mainProjects.forEach((project, index) => {
                const columnIndex = index % columnCount;
                columns[columnIndex].push(project);
            });

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
                name: project.attributes.title,
                imageUrl: project.attributes.mainImage.data.attributes.url,
            }));
            return projects;
        },
    },
};
</script>
  
<style scoped>
.project-name {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    border-radius: 0.4em;
    height: 3em;
    padding: 0;
    font-size: 2em;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    /* Add a smooth transition */
}

.gimage {
    width: 100%;
    opacity: 100%;
    border-radius: 1.5em;
    transition: opacity 0.3s ease-in-out;
    padding: 1em;
}

.project-img:hover .project-name,
.hovered {
    opacity: 1;
    /* Make it fully visible on hover or if hovered is true */
}

.project-img:hover .gimage {
    opacity: 0.3;
    /* Set image opacity to 50% on hover */
}
</style>
