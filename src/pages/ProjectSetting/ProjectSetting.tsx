import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Container, Button } from '@material-ui/core';
import modifiProject from '@api/project/modifiProject';
import { User } from '@store/type';
import AppbarShift from '../layout/AppbarShift';
import FixedInformation from './components/FixedInformation';
import ProjectNameInput from './components/ProjectNameInput';
import ProjectAdmin from './components/ProjectAdmin';
import ProjectMember from './components/ProjectMember';

interface Props {
  project: any;
  user: User;
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
  button: {
    margin: theme.spacing(1),
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const ProjectSetting = ({ project, user }: Props): JSX.Element => {
  const classes = useStyles();
  const [projectName, setProjectName] = useState(project.projectName);
  const [projectMembers, setMembers] = useState<User[]>(project.members);
  const [projectAdmins, setAdmins] = useState<User[]>(project.admins);
  const projectId = project._id;
  const owner = project.owner === undefined ? 'loding' : project.owner.nickname; // project.owner.nickname;
  const { platform, sdkToken } = project;

  const handlePatcheButton = () => {
    modifiProject(projectId, projectName, projectAdmins, projectMembers);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppbarShift />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <FixedInformation {...{ projectId, owner, platform, sdkToken }} />
            <ProjectNameInput {...{ projectName, setProjectName }} />
            <ProjectAdmin {...{ projectAdmins, setAdmins }} />
            <ProjectMember {...{ projectMembers, setMembers }} />
            <Grid item xs className={classes.buttonWrap}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handlePatcheButton}
                disabled={projectName.length < 4}
              >
                프로젝트 수정하기
              </Button>
              <Button
                disabled={projectMembers.some(
                  (member) => member._id === user._id,
                )}
              >
                프로젝트 삭제하기
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default ProjectSetting;
