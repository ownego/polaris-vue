import { computed, inject, ref } from 'vue';

export type EphemeralPresenceKey = 'tooltip';

export interface EphemeralPresenceManagerContextType {
  presenceList: {
    [key in EphemeralPresenceKey]: boolean;
  };
  presenceCounter: {
    [key in EphemeralPresenceKey]: number;
  };
  addPresence: (key: EphemeralPresenceKey) => void;
  removePresence: (key: EphemeralPresenceKey) => void;
}

type PresenceList = {
  [key in EphemeralPresenceKey]: boolean;
};

type PresenceCounter = {
  [key in EphemeralPresenceKey]: number;
};


export default function useEphemeralPresenceManager() {
  const context = inject('ephemeral-presence-manager');
  return context;
}

export function useEphemeralPresenceManagerContext() {
  const presenceCounter = ref<PresenceCounter>({ tooltip: 0 });

  const addPresence = (key: EphemeralPresenceKey) => {
    presenceCounter.value[key] += 1;
  };

  const removePresence = (key: EphemeralPresenceKey) => {
    presenceCounter.value[key] -= 1;
  };

  const presenceList = computed<PresenceList>(() => {
    return Object.entries(presenceCounter.value).reduce((prevValue, currentValue) => {
      const [key, value] = currentValue;

      return {
        ...prevValue,
        [key]: value > 0,
      };
    }, {} as PresenceList);
  });

  return {
    presenceList,
    presenceCounter,
    addPresence,
    removePresence,
  };
}
