<template>
  <h1 v-if="navNames">{{ navNames.Blog_Eng }}</h1>
  <div class="all-projects">
    <div class="project-box" v-for="(project, index) in mainProjects" :key="index">
      <a class="project-name" :href="`/en/blog/${project.name}`">
        <h4>{{ project.name }}</h4>
      </a>
      <a class="project-image" :href="`/en/blog/${project.name}`">
        <img :src="baseUrl + project.imageUrl" alt="blog post image" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "", // Set the base URL for images
      mainProjects: [], // Array to store projects
      hovered: -1, // Track hover state
      navNames: null,
    };
  },
  async created() {
    this.mainProjects = await this.GetProjects();
    this.navNames = await fetchNavNames();
  },
  methods: {
    toggleHovered(index) {
      this.hovered = index;
    },
    async GetProjects() {
      const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/blogs?populate=*");
      const { data } = await response.json();
      const posts = data.map((project) => ({
        name: project.attributes.title_Eng,
        imageUrl: project.attributes.image.data.attributes.url,
      }));
      return posts.reverse()
    },
  },
};

async function fetchNavNames() {
  try {
    const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/navigation-name");
    const { data } = await response.json();
    return data.attributes;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
</script>
