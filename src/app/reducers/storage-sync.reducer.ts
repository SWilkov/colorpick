import { storageSync } from "@larscom/ngrx-store-storagesync";
import { ActionReducer } from "@ngrx/store";
import { AppState } from ".";

export function storageSyncReducer(reducer: ActionReducer<AppState>) {
  const sync = storageSync<AppState>({
    features: [
      {
        stateKey: 'theme'
      },
      {
        stateKey: 'hexadecimal',
        excludeKeys: ['error', 'binaryValue']
      },
      {
        stateKey: 'balloon'
      }
    ],
    rehydrate: true,
    storage: window.sessionStorage
  });

  return sync(reducer);
};
