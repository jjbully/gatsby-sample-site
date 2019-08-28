import React from "react"
import { css } from "@emotion/core"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"


const IndexPage = ({ data }) => {

  const numberPost = data.allWordpressPost.totalCount
  const numberPage = data.allWordpressPage.totalCount

  return (
  <Layout>
    <div
      css={css`
        font-family: arial;
        font-size: 24px;
        margin-bottom: 16px;
        font-weight: 3;
      `}
    >
      There are {numberPost} {numberPost > 1 ? 'posts' : 'post'} 
    </div>
    {data.allWordpressPost.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={`posts/${node.slug}`}>
          <div css={css` margin-bottom: 10px; `}>
            <h2 css={css`
              display: inline-block; 
              color: black;
              margin-right: 10px;
              margin-bottom: 0;
            `}>
              {node.title}
            </h2>
            <h2 css={css`
              display: inline-block; 
              color: grey;
              margin-bottom: 0;
            `}>
              {node.date}
            </h2>
          </div>
        </Link>
        <p
          css={css` font-family: arial; `}
          dangerouslySetInnerHTML={{
            __html: node.excerpt,
          }}
        />

      </div>
    ))}

    <div
      css={css`
        font-family: arial;
        font-size: 24px;
        margin-bottom: 16px;
        margin-top: 90px;
        font-weight: 3;
      `}
    >
      There are {numberPage} {numberPage > 1 ? 'pages' : 'page'} 
    </div>
    {data.allWordpressPage.edges.map(({ node }) => (
      <div key={node.id}>
        <Link to={`${node.slug}`}>
          <div css={css` margin-bottom: 10px; `}>
            <h2 css={css`
              display: inline-block; 
              color: black;
              margin-right: 10px;
              margin-bottom: 0;
            `}>
              {node.title}
            </h2>
            <h2 css={css`
              display: inline-block; 
              color: grey;
              margin-bottom: 0;
            `}>
              {node.date}
            </h2>
          </div>
        </Link>
        <p
          css={css` 
            font-family: arial; 
          `}
          dangerouslySetInnerHTML={{
            __html: node.excerpt,
          }}
        />

      </div>
    ))}

  </Layout>
  )
}

export const query = graphql`
  query {
    allWordpressPost(sort: {fields: [date], order:DESC}) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "DD MMMM, YYYY")
          excerpt
        }
      }
      totalCount
    }
    allWordpressPage(sort: {fields: [date], order:DESC}) {
      edges {
        node {
          id
          slug
          title
          date(formatString: "DD MMMM, YYYY")
          excerpt
        }
      }
      totalCount
    }
  }
`


export default IndexPage
