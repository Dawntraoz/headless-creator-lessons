<template>
  <div
    v-editable="blok"
    class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-lesson"
  >
    <nav
      aria-label="sidebar-navigation"
      class="flex md:flex-col items-center md:items-start gap-6 pt-6 md:pt-20"
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
    <article class="py-8 md:pt-16 md:pb-12 md:pr-6">
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
            class="flex items-center gap-2 text-emerald-700"
          >
            Link to lesson
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" width="20" height="20">
              <path d="M 41.470703 4.9863281 A 1.50015 1.50015 0 0 0 41.308594 5 L 27.5 5 A 1.50015 1.50015 0 1 0 27.5 8 L 37.878906 8 L 22.439453 23.439453 A 1.50015 1.50015 0 1 0 24.560547 25.560547 L 40 10.121094 L 40 20.5 A 1.50015 1.50015 0 1 0 43 20.5 L 43 6.6894531 A 1.50015 1.50015 0 0 0 41.470703 4.9863281 z M 12.5 8 C 8.3754991 8 5 11.375499 5 15.5 L 5 35.5 C 5 39.624501 8.3754991 43 12.5 43 L 32.5 43 C 36.624501 43 40 39.624501 40 35.5 L 40 25.5 A 1.50015 1.50015 0 1 0 37 25.5 L 37 35.5 C 37 38.003499 35.003499 40 32.5 40 L 12.5 40 C 9.9965009 40 8 38.003499 8 35.5 L 8 15.5 C 8 12.996501 9.9965009 11 12.5 11 L 22.5 11 A 1.50015 1.50015 0 1 0 22.5 8 L 12.5 8 z"/>
            </svg>
          </a>
        </p>
        <h1 class="font-bold text-4xl md:text-6xl leading-light md:leading-light">
          {{ story.name }}
        </h1>
      </header>
      <div v-if="blok.lesson_content" class="py-6 lesson-content">
        <rich-text-renderer :document="blok.lesson_content" />
      </div>
    </article>
    <aside
      class="
        border-t-2
        md:border-t-0 md:border-l-2
        border-gray-100
        py-6
        md:pl-12
        md:py-24
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

<style scoped>
.nuxt-link-exact-active {
  @apply text-gray-900;
}

/* Lesson Content */
.lesson-content blockquote {
  @apply border-l-2 border-gray-200 pl-6 italic font-normal text-gray-500 text-sm md:text-base leading-relaxed mb-4;
}
.lesson-content blockquote::before {
  content: '';
  @apply block w-4 h-4 bg-emerald-500 rounded-full mb-4;
}
.lesson-content h2 {
  @apply font-bold text-gray-900 text-2xl md:text-3xl mb-4;
}
.lesson-content h3 {
  @apply font-bold text-emerald-900 text-lg md:text-xl mb-2;
}
.lesson-content b {
  @apply font-bold text-gray-900;
}
.lesson-content p {
  @apply font-normal pb-4 text-gray-500 leading-relaxed;
}
.lesson-content ol {
  @apply pl-4 list-decimal pb-4;
}
.lesson-content ul {
  @apply pl-4 list-disc pb-4;
}
.lesson-content pre {
  @apply block px-4 overflow-x-auto bg-gray-100;
}
.lesson-content p > code {
  @apply py-1;
}
.lesson-content a {
  @apply text-emerald-700 underline;
}
.lesson-content code {
  @apply bg-gray-100 text-emerald-900 leading-tight font-mono px-1;
}
</style>

<style>
/* Lesson Quotes */
.lesson-quotes p {
  @apply pb-4 text-xs text-gray-500 leading-loose;
}
.lesson-quotes b {
  @apply text-base text-gray-900;
}
</style>
