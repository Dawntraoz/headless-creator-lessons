<template>
  <component
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
    :story="story"
    :is="story.content.component"
  />
</template>

<script>
export default {
  data() {
    return {
      story: { content: {} },
    };
  },
  mounted() {
    this.$storybridge(
      () => {
        const storyblokInstance = new StoryblokBridge();

        // Listen to Storyblok's Visual Editor event
        storyblokInstance.on(["input", "published", "change"], (event) => {
          if (event.action == "input") {
            if (event.story.id === this.story.id) {
              this.story.content = event.story.content;
            }
          } else {
            this.$nuxt.$router.go({
              path: this.$nuxt.$router.currentRoute,
              force: true,
            });
          }
        });
      }
    );
  },
  asyncData(context) {
    // We are getting only the draft version of the content in this example.
    // In real world project you should ask for correct version of the content
    // according to the environment you are deploying to.
    // const version = context.query._storyblok || context.isDev ? 'draft' : 'published'

    const fullSlug =
      context.route.path == "/" || context.route.path == ""
        ? "home"
        : context.route.path;
    const version =
      context.query._storyblok || context.isDev || process.env.NUXT_TARGET_ENV === 'staging' ? "draft" : "published";

    // Load the JSON from the API - loadig the home content (index page)
    return context.app.$storyapi
      .get(`cdn/stories/${fullSlug}`, {
        version,
      })
      .then((res) => {
        return res.data;
      })
      .catch((res) => {
        if (!res.response) {
          console.error(res);
          context.error({
            statusCode: 404,
            message: "Failed to receive content form api",
          });
        } else {
          console.error(res.response.data);
          context.error({
            statusCode: res.response.status,
            message: res.response.data,
          });
        }
      });
  },
  head() {
    return {
      title: this.story.name,
      meta: [
        ...this.$addMetaData({
          title: this.story.name,
          description: this.story.content.excerpt,
          url: this.story.full_slug === 'home' ? '' : this.story.full_slug,
          image: this.story.content.shared_image?.filename,
        }),
        {
          hid: 'og:publish_date',
          name: 'publish_date',
          property: 'og:publish_date',
          content: this.story.first_published_at,
        },
      ],
    }
  },
};
</script>
