import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Container } from '@material-ui/core';
import { Docs, Issue } from '@state/type';
import AppbarShift from '../layout/appbarshift';
import FixedInformation from './components/FixedInformation';
import ProjectNameInput from './components/ProjectNameInput';
import ProjectAdmin from './components/projectAdmin';

interface Props {
  project: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const ProjectSetting = ({ project }: Props): JSX.Element => {
  const classes = useStyles();
  const [projectName, setProjectName] = useState(project.projectName===undefined?"loding":project.projectName);
  const [members, setMembers] = useState(project.members);
  const [admins, setAdmins] = useState(project.admins);
  const projectId = project._id;
  const owner = project.owner===undefined?"loding":project.owner.nickname; // project.owner.nickname;
  const {platform,sdkToken} = project;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppbarShift />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <FixedInformation {...{projectId,owner,platform,sdkToken}} />
            <ProjectNameInput {...{projectName, setProjectName}} />
            <ProjectAdmin {...{admins, setAdmins}} />
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ProjectSetting;
