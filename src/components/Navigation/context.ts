import { inject } from 'vue';

interface NavigationContextType {
  location: string;
  onNavigationDismiss?(): void;
  withinContentContainer?: boolean;
}

export function UseNavigationContext() {
  const NavigationContext = inject('NavigationContext', { location: '' }) as NavigationContextType;

  function useNavigationContext() {
    return NavigationContext;
  }

  return { useNavigationContext };
}
