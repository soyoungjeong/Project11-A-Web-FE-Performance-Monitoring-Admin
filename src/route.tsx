import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from '@pages/SignIn/signin';
import SingUp from '@pages/SignUp/signup';
import ProjectListContainer from '@pages/ProjectList/projectListContainer';
import NewProject from '@pages/NewProject/newproject';
import IssueListContainer from '@/pages/IssueList/IssueListContainer';
import Setting from '@pages/ProjectSetting/setting';
import IssueDetailContainer from '@/pages/IssueDetail/IssueDetailContainer';

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SingUp} />
        <Route exact path="/project" component={ProjectListContainer} />
        <Route exact path="/newproject" component={NewProject} />
        <Route exact path="/issue" component={IssueListContainer} />
        <Route exact path="/setting" component={Setting} />
        <Route exact path="/issuedetail/:id" component={IssueDetailContainer} />
      </Switch>
    </BrowserRouter>
  );
}
