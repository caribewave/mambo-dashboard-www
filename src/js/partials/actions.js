import {CALL_API} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Loads METADATA
 *-----------------------------------------------------------------------------------------*/
export const LOAD_METADATA_REQUEST = 'LOAD_METADATA_REQUEST';
export const LOAD_METADATA_SUCCESS = 'LOAD_METADATA_SUCCESS';
export const LOAD_METADATA_FAILURE = 'LOAD_METADATA_FAILURE';
const loadMetadataAsync = () => ({
  [CALL_API]: {
    types: [ LOAD_METADATA_REQUEST, LOAD_METADATA_SUCCESS, LOAD_METADATA_FAILURE ],
    endpoint: `metadata.json`,
    method: 'GET'
  }
});

export const loadMetadata = () => (dispatch) => {
  return dispatch(loadMetadataAsync());
};
