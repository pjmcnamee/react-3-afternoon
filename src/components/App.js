import React, { Component } from "react";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";
import axios from "axios";

const baseUrl = "https://practiceapi.devmountain.com/api/posts";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.filterPost = this.filterPost.bind(this);
  }

  componentDidMount() {
    axios
      .get(baseUrl)
      .then(results => {
        this.setState({
          posts: results.data
        });
      })
      .catch(error => ("some error: ", error));
  }

  updatePost(id, text) {
    axios
      .put(`${baseUrl}/?id=${id}`, { text })
      .then(results => {
        this.setState({
          posts: results.data
        });
      })
      .catch(error => console.log("some error ", error));
  }

  deletePost(id) {
    axios
      .delete(`${baseUrl}/?id=${id}`)
      .then(results => {
        this.setState({
          posts: results.data
        });
      })
      .catch(error => console.log("had a error", error));
  }

  createPost(text) {
    axios
      .post(baseUrl, { text })
      .then(results =>
        this.setState({
          posts: results.data
        })
      )
      .catch(error => console.log("Big ol error ", error));
  }

  filterPost(text) {
    console.log("this is the text before conversion", text);
    let encodedString = encodeURI(text);
    console.log("this is the encoded string", encodedString);
    axios
      .get(`${baseUrl}/filter?text=${encodedString}`)
      .then(results =>
        this.setState({
          posts: results.data
        })
      )
      .catch(error => ("Filter error ", error));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filterPostFn={this.filterPost} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />

          {posts.map(post => (
            <Post
              key={post.id}
              text={post.text}
              date={post.date}
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
