import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"

export default ({ data }) => {
  const page = data.wordpressPage
  console.log(page)

  return (
    <Layout>
      <h2>{page.title}</h2>
      <div
        css={css` font-family: arial; `}
        dangerouslySetInnerHTML={{
          __html: page.content,
        }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    wordpressPage(id: { eq: $id}) {
      content
      title
    }
  }
`