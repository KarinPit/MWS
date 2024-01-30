<template>
    <h1>{{ navNames.Reviews }}</h1>
    <div class="review" v-for="(review, index) in sortedReviews" :key="index">
        <div class="review-image">
            <img :src=review.image :style="getImageStyle(review)">
        </div>
        <div class="review-text">
            <h3>{{ review.title }}</h3>
            <p>{{ review.description }}</p>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            reviews: [],
            navNames: [],
        };
    },
    async created() {
        // Fetch the data when the component is created
        this.reviews = await this.getReviews();
        this.navNames = await fetchNavNames();
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
        async getReviews() {
            const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/reviews?populate=*");
            const { data } = await response.json();
            const reviews = data.map((review) => ({
                title: review.attributes.title,
                description: review.attributes.content.map((child) => child.children.map((children) => children.text)).flat().join(' '),
                image: review.attributes.image.data.attributes.url,
                objectPosition: review.attributes.objectPosition,
            }));
            return reviews;
        },

        getImageStyle(review) {
            const objectPosition = review.objectPosition || "50% 50%";
            return {
                objectPosition: objectPosition
            };
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