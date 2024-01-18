<template>
  <h2 v-if="navNames">{{ navNames.Blog }}</h2>
  <div class="image-gallery">
    <div class="image-col" v-for="(column, colIndex) in imageColumns" :key="colIndex">
      <div class="post-box" v-for="(post, index) in column" :key="index" @mouseover="toggleHovered(index)"
        @mouseout="toggleHovered(-1)">
        <a class="post-name" :href="`/blog/${post.name}`">{{ post.name }}</a>
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
      // baseUrl: "https://mws-data-280b2464bf34.herokuapp.com/",
      baseUrl: "",
      posts: [],
      hovered: -1, // Track hover state, initialize to -1 to indicate no hover
      navNames: null,
    };
  },
  async created() {
    // Fetch the data when the component is created
    this.posts = await this.GetPosts(); // Call the GetProjects method
    this.navNames = await fetchNavNames();
  },
  computed: {
    imageColumns() {
      const columnCount = 3; // Number of columns
      const columns = new Array(columnCount).fill().map(() => []);
      const posts = this.posts;

      for (let i = 0; i < posts.length; i++) {
        columns[i % columnCount].push(posts[i]);
      }

      return columns;
    },
  },
  methods: {
    toggleHovered(index) {
      this.hovered = index;
    },
    async GetPosts() {
      const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/blogs?populate=*");
      const { data } = await response.json();
      const posts = data.map((post) => ({
        name: post.attributes.title,
        imageUrl: post.attributes.image.data.attributes.url,
      }));
      return posts;
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

.post-box {
  display: flex;
  justify-content: center;
  align-items: center;
  /* Remove fixed width and height */
}

.post-name {
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

.post-box:hover .post-name,
.hovered {
  opacity: 1;
}

.post-box:hover .gimage {
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