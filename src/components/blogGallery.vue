<template>
    <div v-if="post && typeof post === 'object'">
        <img class="gimage" :src="baseUrl + postImage" alt="designed house example" />
    </div>
</template>
  
<script>
export default {
    props: {
        post: Object,
    },
    data() {
        return {
            baseUrl: "http://127.0.0.1:1337",
            postImage: [],
        };
    },
    methods: {
        async GetPost() {
            return this.post.attributes.image.data.attributes.url;
        },
    },
    async created() {
        if (this.post && typeof this.post === 'object') {
            this.postImage = await this.GetPost();
        }
    },
};
</script>
  
<style scoped></style>
  