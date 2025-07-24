import { redirect } from 'next/navigation';

// Redirect to the new sign-up route
export default function SignupRedirect() {
  redirect('/sign-up');
}
