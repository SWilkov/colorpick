import { createAction, props } from "@ngrx/store";
import { Rgba } from "../models/rgba.model";
import { Theme } from "../models/theme.enum";

export const checkTheme = createAction(
  '[THEME] change theme',
  props<{payload: Rgba}>() 
);

export const checkThemeSuccess = createAction(
  '[THEME] change theme success',
  props<{payload: Theme}>() 
);

export const checkThemeFailed = createAction(
  '[THEME] change theme failed',
  props<{payload: Error}>() 
);

export const toggleTheme = createAction(
  '[THEME] toggle theme (dark/light)'
);
