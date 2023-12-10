<template>
    <div v-for="(review, index) in sortedReviews" :key="index">
        <div class="review">
            <h3>{{ review.title }}</h3>
            <!-- <p>{{ formatReviewDate(review.createdAt) }}</p> -->
            <p>{{ review.description }}</p>
            <hr>
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
    computed: {
        sortedReviews() {
            // Sort the reviews by createdAt in descending order (newer first)
            return this.reviews.slice().sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
        },
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
    const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/reviews");
    const { data } = await response.json();
    const reviews = data.map((review) => ({
        title: review.attributes.title,
        description: review.attributes.content.map(child => child.children.map(children => children.text)).flat().join(' ')

    }
    ));


    return reviews;
}
</script>
