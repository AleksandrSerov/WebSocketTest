export const handleSettingsRoomMessage = data => async (dispatch, getState) => {
  dispatch(
    actions.updateDistrictSettings({
      setting: convertSocketSettings(data.setting)
    })
  );
};
