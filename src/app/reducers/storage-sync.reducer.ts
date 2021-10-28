import { storageSync } from "@larscom/ngrx-store-storagesync";
import { ActionReducer } from "@ngrx/store";
import { AppState } from ".";

export function storageSyncReducer(reducer: ActionReducer<AppState>) {
  const sync = storageSync<AppState>({
    features: [
      {
        stateKey: 'theme'
      }
    ],
    rehydrate: true,
    storage: window.sessionStorage
  });

  return sync(reducer);
};
