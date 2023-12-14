<template>
    <div v-for="(review, index) in sortedReviews" :key="index" class="review-area"
        :class="{ 'last-row': isLastRow(index) }">
        <div class="review">
            <img src="/images/Me.jpeg">
            <!-- <p>{{ formatReviewDate(review.createdAt) }}</p> -->
            <div class="review-text">
                <h3>{{ review.title }}</h3>
                <p>{{ review.description }}</p>
            </div>
        </div>
        <hr v-if="!isLastRow(index)" />
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
        this.reviews = await this.getReviews();
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
        isLastRow(index) {
            return index === this.sortedReviews.length - 1;
        },
        async getReviews() {
            const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/reviews");
            const { data } = await response.json();
            const reviews = data.map((review) => ({
                title: review.attributes.title,
                description: review.attributes.content.map((child) => child.children.map((children) => children.text)).flat().join(' '),
            }));

            return reviews;
        },
    },
};
</script>
  
<style scoped>
.last-row {
    padding-bottom: 3em;
}

.review {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    padding: 2em 2em;
    background: #efefef;
    margin: 2em 0;
}

hr {
    display: none;
    /* width: 75%;
    margin-top: 2em;
    border: none;
    border-top: 0.3em dashed #333; */
}

#add-review {
    display: inline;
    margin-bottom: 1em;
}

.review-row {
    padding: 5em 0;
}

.review-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.review img {
    object-fit: cover;
    object-position: 50% 0;
    flex: 40%;
}

.review-text {
    display: flex;
    flex-direction: column;
    align-items: start;
    flex: 60%;

}


p {
    text-align: justify;
    font-size: 1.2em;
    width: 90%;
    margin: 0;
    padding: 0;
    height: fit-content;
}

@media (max-width: 340px),
(min-width: 341px) and (max-width: 575px),
(min-width: 576px) and (max-width: 767px) {

    h3 {
        margin: auto;
    }

    p {
        margin: auto;
    }

    .review {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1em 2em 4em 2em;
    }

    .review img {
        width: 50vw;
        max-height: 30em;
        padding: 2em 0;
    }
}

@media (min-width: 768px) and (max-width: 991px) {

    h3 {
        margin: auto;
    }

    p {
        margin: auto;
    }

    .review {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2em 5em 4em 5em;
    }

    .review img {
        width: 50vw;
        max-height: 30em;
        padding: 2em 0;
    }

}

@media (min-width: 992px) {
    .review img {
        width: 40vw;
        max-height: 25em;
        padding: 1em 3em;
    }

}
</style>