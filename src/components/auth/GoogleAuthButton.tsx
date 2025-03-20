import { auth } from "@/lib/firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

type Props = {
  text: string
}

const GoogleAuthButton = (props: Props) => {
  const router = useRouter();

  const handleGoogleAuth = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return <button onClick={handleGoogleAuth}>Googleアカウントで{props.text}</button>;
};

export default GoogleAuthButton;
