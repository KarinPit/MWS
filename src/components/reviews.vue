<template>
    <div v-for="(review, index) in reviews" :key="index">
        <div>
            <h4>ביקורת חדשה</h4>
            <p>{{ formatReviewDate(review.createdAt) }}</p>
            <p>{{ review.title }}</p>
            <p>{{ review.content }}</p>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            reviews: [],
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.reviews = await GetReviews();
    },
    methods: {
        formatReviewDate(createdAt) {
            const date = new Date(createdAt);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        },
    },

};

async function GetReviews() {
    const response = await fetch("http://127.0.0.1:1337/api/reviews");
    const { data } = await response.json();
    const reviews = data.map((review) => review.attributes);
    return reviews;
}
</script>
  