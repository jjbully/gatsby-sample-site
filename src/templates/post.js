import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.wordpressPost

  return (
    <Layout>
      <h2>{post.title}</h2>
      <div
        css={css` font-family: arial; `}
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id}) {
      content
      title
    }
  }
`