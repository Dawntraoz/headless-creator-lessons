export default (context, inject) => {
  const addMetaData = (data) => [
    { hid: 'og:title', property: 'og:title', content: data.title },
    {
      hid: 'apple-mobile-web-app-title',
      property: 'apple-mobile-web-app-title',
      content: data.title,
    },
    { hid: 'description', name: 'description', content: data.description },
    {
      hid: 'og:description',
      property: 'og:description',
      content: data.description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: data.image,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://focus-on-storyblok.dawntraoz.com/' + data.url,
    },
  ]
  // Inject $addMetaData(data) in Vue, context and store.
  inject('addMetaData', addMetaData)
}
