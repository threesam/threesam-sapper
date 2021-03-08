import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'qcht0vh1',
  dataset: 'production',
  useCdn: true
})

export default client