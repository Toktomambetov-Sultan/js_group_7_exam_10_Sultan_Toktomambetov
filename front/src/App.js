import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout/Layout";
import NewsPostPage from "./conatiners/NewsPostPage/NewsPostPage";
import NewPostsList from "./conatiners/NewsPostsList/NewsPostsList";
import OnePostPage from "./conatiners/OnePostPage/OnePostPage";

function App() {
  return (
    <div>
      <Layout>

        <Switch>
          <Redirect from="/" exact to="newsPosts" />
          <Route path="/newNewsPost" exact component={NewsPostPage} />
          <Route path="/newsPosts" exact component={NewPostsList} />
          <Route path="/post/:id" exact component={OnePostPage} />

        </Switch>
      </Layout>
    </div >
  );
}

export default App;
