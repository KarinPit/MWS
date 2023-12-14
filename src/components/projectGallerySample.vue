<template>
    <div class="image-gallery">
        <div class="project-img" v-for="(project, index) in selectedProjects" :key="index" @mouseover="toggleHovered(index)"
            @mouseout="toggleHovered(-1)">
            <a class="project-name" :href="`/projects/${project.name}`">{{ project.name }}</a>
            <a :href="`/projects/${project.name}`">
                <img class="gimage" :src="baseUrl + project.imageUrl" alt="designed house example" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // baseUrl: "https://mws-data-280b2464bf34.herokuapp.com/",
            baseUrl: "",
            mainProjects: [],
            hovered: -1, // Track hover state, initialize to -1 to indicate no hover
        };
    },
    computed: {
        selectedProjects() {
            // Filter out projects that are not category-selected
            return this.mainProjects.filter(project => project.publishStatus === 'selected');
        }
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
            const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/projects?populate=*");
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
.image-gallery {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: auto;
}

.project-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.gimage {
    max-width: 20vw;
    object-fit: cover;
    padding: 0.5em;
}

.project-name {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    height: 3em;
    padding: 0;
    font-size: 1.5em;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.project-img:hover .project-name,
.hovered {
    opacity: 1;
}

.project-img:hover .gimage {
    opacity: 0.3;
}


@media (max-width: 340px) {
    .image-gallery {
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-wrap: wrap;
        /* Add this to allow items to wrap onto the next line */
        width: 100%;
        padding: 0;
    }

    .img-col {
        width: 100%;
        /* Change the width to 100% to make them stack vertically */
        height: fit-content;
    }

    .project-img {
        width: 100%;
    }

    .project-name {
        width: 10em;
    }

    .gimage {
        max-width: 70vw;
        height: 40em;
    }
}

/* Media query for screens smaller than 576px (e.g., smartphones) */
@media (min-width: 341px) and (max-width: 575px) {
    .image-gallery {
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-wrap: wrap;
        /* Add this to allow items to wrap onto the next line */
        width: 100%;
        padding: 0;
    }

    .img-col {
        width: 100%;
        /* Change the width to 100% to make them stack vertically */
        height: fit-content;
    }
    .project-img {
        width: 100%;
    }

    .project-name {
        width: 10em;
    }

    .gimage {
        max-width: 50vw;
        height: 40em;
    }
}

/* Media query for screens between 576px and 767px (e.g., small tablets) */
@media (min-width: 576px) and (max-width: 767px) {
    .image-gallery {
        display: flex;
        align-items: stretch;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        padding: 0 5em;
    }

    .img-col {
        width: 100%;
        height: fit-content;
    }

    .project-img {
        width: 100%;
    }

    .project-name {
        width: 10em;
    }

    .gimage {
        max-width: 50vw;
        height: 45em;
    }
}

/* Media query for screens between 768px and 991px (e.g., larger tablets and small desktops) */
@media (min-width: 768px) and (max-width: 991px) {
    .project-img {
        width: 100%;
    }

    .project-name {
        width: 10em;
    }

    .gimage {
        height: 25em;
    }
}

/* Media query for screens between 992px and 1199px (e.g., larger desktops) */
@media (min-width: 992px) {
    .project-img {
        width: 100%;
    }

    .project-name {
        width: 10em;
    }

    .gimage {
        height: 30em;
    }
}
</style>