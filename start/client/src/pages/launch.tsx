import React, {Fragment} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {RouteComponentProps} from '@reach/router';
import gql from 'graphql-tag';

import {Loading, Header, LaunchDetail} from "../components";
import {ActionButton} from "../containers";
import * as LaunchDetailsTypes from './__generated__/LaunchDetails';
import {LAUNCH_TILE_DATA} from "./launches";

interface LaunchProps extends RouteComponentProps {
    launchId?: any
}

const Launch: React.FC<LaunchProps> = ({launchId}) => {
    const {data, loading, error} = useQuery<LaunchDetailsTypes.LaunchDetails,
        LaunchDetailsTypes.LaunchDetailsVariables>(GET_LAUNCH_DETAILS,
        {variables: {launchId}});

    if (loading) return <Loading/>;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;

    return (
        <Fragment>
            <Header image={data && data.launch && data.launch.mission && data.launch.mission.missionPatch}>
                {data && data.launch && data.launch.mission && data.launch.mission.name}
            </Header>
            <LaunchDetail {...data.launch} />
            <ActionButton {...data.launch} />
        </Fragment>
    );

}

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      id
      site
      isBooked
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

export default Launch;
