import { redirect } from 'next/navigation';

// Redirect to the new sign-in route
export default function LoginRedirect() {
  redirect('/sign-in');
}
