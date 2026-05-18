import { Redirect } from 'expo-router';
import { useOnboarded } from '../src/store/selectors';

export default function Index() {
  const onboarded = useOnboarded();
  return <Redirect href={onboarded ? '/(tabs)' : '/onboarding'} />;
}
