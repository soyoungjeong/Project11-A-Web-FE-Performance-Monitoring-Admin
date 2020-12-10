import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Button, Grid, TextField } from '@material-ui/core';
import searchMember from '@api/project/searchMember';
import { User } from '@store/type';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    inputSet: {
      height: '45px',
      marginLeft: '5px',
    },
  }),
);

interface prop {
  projectMembers: User[];
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
}

const ProjectMember = (props: prop): JSX.Element => {
  const classes = useStyles();
  const [searchQuery, setQuery] = useState('');
  const [errorText, setErrorText] = useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const handleDeleteMemberClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    props.setMembers(props.projectMembers.filter(member=>event.currentTarget.value!==member._id));
  };
  const handleAddMemberClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    props.setMembers([...props.projectMembers, { 
      _id:String(event.currentTarget.value),
      nickname:String(event.currentTarget.textContent) 
    }]);
  };
  const handleSearchButtonClick = async () => {
    const searchArray = await searchMember(searchQuery);
    setSearchResult(searchArray);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>함께 프로젝트를 진행할 사람들을 선정해주세요.</Typography>
        </Grid>
        <Grid container item xs={12} spacing={0}>
          {props.projectMembers.map((member) => (
            <Grid key={member._id} item xs={2}>
              <Button
                variant="outlined"
                value={member._id}
                onClick={handleDeleteMemberClick}
              >
                <span>{member.nickname}</span>
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
        <Grid item xs={6}>
          <TextField
            error={searchQuery.length < 3}
            helperText={errorText}
            id="search-query"
            label="검색할 사용자 닉네임"
            defaultValue={searchQuery}
            onChange={({ target: { value } }) => {
              setQuery(value);
              setErrorText(
                searchQuery.length < 3 ? '검색어가 너무 짧습니다.' : '',
              );
            }}
          />
          <Button
            className={classes.inputSet}
            variant="contained"
            color="primary"
            disabled={searchQuery.length < 3}
            onClick={handleSearchButtonClick}
          >
            찾기
          </Button>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          {searchResult.map((member) => (
            <Grid key={member._id} item xs={3}>
              <Button
                variant="outlined"
                value={member._id}
                onClick={handleAddMemberClick}
              >
                <span>{member.nickname}</span>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
export default ProjectMember;
