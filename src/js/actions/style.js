import {CALL_API} from '../client/api';

/*------------------------------------------------------------------------------------------
 * Style actions
 *-----------------------------------------------------------------------------------------*/
export const CHANGE_MAP_STYLE = 'CHANGE_MAP_STYLE';

export const changeMapStyle = (style) => ({
  type: CHANGE_MAP_STYLE,
  style: style
});