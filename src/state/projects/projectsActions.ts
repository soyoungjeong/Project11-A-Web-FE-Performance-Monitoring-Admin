import { Project, ProjectDocs } from '@state/type';

export const GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST';
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_FAIL = 'GET_PROJECTS_FAIL';

export interface GetProjectsAction {
  type:
    | typeof GET_PROJECTS_REQUEST
    | typeof GET_PROJECTS_SUCCESS
    | typeof GET_PROJECTS_FAIL;
  projects?: ProjectDocs;
  errorMsg?: string;
}

export const getProjectsRequest = (): GetProjectsAction => {
  return {
    type: GET_PROJECTS_REQUEST,
  };
};

export const getProjectsSuccess = (
  projects: ProjectDocs,
): GetProjectsAction => {
  return {
    type: GET_PROJECTS_SUCCESS,
    projects,
  };
};

export const getProjectsFail = (errorMsg: string): GetProjectsAction => {
  return {
    type: GET_PROJECTS_FAIL,
    errorMsg,
  };
};
