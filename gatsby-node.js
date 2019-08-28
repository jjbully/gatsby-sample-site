const path = require(`path`)
const slash = require(`slash`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allWordpressPage {
        edges {
          node {
            id
            slug
            title
            content
            excerpt
            date
            modified
            path
          }
        }
      }
      allWordpressPost {
        edges {
          node {
            id
            slug
            title
            date
            content
            excerpt
            path
          }
        }
      }
    }
  `)

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Access query results via object destructuring
  const { allWordpressPage, allWordpressPost } = result.data

  // Create Page pages.
  const pageTemplate = path.resolve(`./src/templates/page.js`)

  allWordpressPage.edges.forEach(edge => {
    createPage({
      path: edge.node.path,
      component: slash(pageTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })

  // Create Post post
  const postTemplate = path.resolve(`./src/templates/post.js`)
  
  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `posts/${edge.node.slug}`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
}
