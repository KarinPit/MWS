<template>
    <div>
      <div v-for="(stage, index) in stages" :key="index">
        <h3 class="mainBackground">{{ stage.title }}</h3>
        <p class="steps">{{ stage.desc }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        baseUrl: "",
        stages: [],
      };
    },
    async created() {
      // Fetch the data when the component is created
      this.stages = await this.GetStages();
    },
    methods: {
      async GetStages() {
        const response = await fetch("https://mws-data-280b2464bf34.herokuapp.com/api/about-stages");
        const { data } = await response.json();
  
        const stages = data.map((stage) => ({
          title: stage.attributes.title,
          desc: stage.attributes.description.map(child => child.children.map(chtext => chtext.text)).flat().join(' '),
        }));
  
        return stages;
      },
    },
  };
  </script>
  