export type Reducer<SliceState, SliceAction> = (
  state: SliceState,
  action: SliceAction,
) => SliceState;
