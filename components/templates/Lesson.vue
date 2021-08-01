<template>
  <div
    v-editable="blok"
    class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-lesson"
  >
    <nav
      aria-label="sidebar-navigation"
      class="flex md:flex-col items-center md:items-start gap-6 pt-6 md:pt-24"
    >
      <span class="font-bold uppercase">Lessons</span>
      <ul
        v-if="lessons.length > 0"
        class="
          flex
          md:flex-col
          gap-4
          md:gap-12
          font-oswald font-light
          text-gray-500 text-3xl
        "
      >
        <li v-for="(lesson, index) in lessons" :key="`lesson-${lesson.slug}`">
          <nuxt-link :to="`/lessons/${lesson.slug}`">{{
            index + 1 > 10 ? index + 1 : "0" + (index + 1)
          }}</nuxt-link>
        </li>
      </ul>
    </nav>
    <article class="py-8 md:py-12">
      <header>
        <p class="flex items-center text-xs pb-4 md:pt-4 text-gray-500">
          {{
            new Date(story.first_published_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          }}
          <span class="block w-2 h-2 rounded-full bg-emerald-500 mx-2"></span>
          <a
            :href="blok.lesson_link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-emerald-700"
            >Link to lesson</a
          >
        </p>
        <h1 class="font-bold text-4xl md:text-6xl leading-light md:leading-light">
          {{ story.name }}
        </h1>
      </header>
      <div v-if="contentParsed" v-html="contentParsed" />
    </article>
    <aside
      class="
        border-t-2
        md:border-t-0 md:border-l-2
        border-gray-100
        py-6
        md:pl-12
        md:py-32
        lg:pl-20
      "
    >
      <span class="block w-4 h-4 rounded-full bg-emerald-700 mb-6"></span>
      <div v-if="quotesParsed" v-html="quotesParsed" class="lesson-quotes" />
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    story: {
      type: Object,
      required: true,
    },
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      lessons: [],
    };
  },
  computed: {
    contentParsed() {
      return this.$storyapi.richTextResolver.render(this.blok.lesson_content);
    },
    quotesParsed() {
      return this.$storyapi.richTextResolver.render(this.blok.lesson_quotes);
    },
  },
  async fetch() {
    const res = await this.$storyapi.get("cdn/stories", {
      version: this.isDev ? "draft" : "published",
      starts_with: "lessons/",
      sort_by: "first_published_at:asc",
    });
    this.lessons = res.data.stories;
  },
};
</script>

<style>
.nuxt-link-exact-active {
  @apply text-gray-900;
}
.lesson-quotes p {
  @apply pb-4 text-xs text-gray-500 leading-loose;
}
.lesson-quotes b {
  @apply text-base text-gray-900;
}
</style>
