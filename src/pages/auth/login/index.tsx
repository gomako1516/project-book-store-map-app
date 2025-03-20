import { auth } from "@/lib/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          alert(
            "ユーザーが存在しません。メールアドレスとパスワードを確認してください。"
          );
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>ログイン</h1>
        <div>
          <label>メールアドレス</label>
          <input
            type="text"
            {...register("email", {
              // react-room-hookのregisterを使ってバリデーションを設定
              required: "メールアドレスは必須です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/, // メールアドレスの正規表現
                message: "不適切なメールアドレスです。",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            {...register("password", {
              required: "パスワードは必須です。",
              minLength: {
                value: 6,
                message: "6文字以上入力してください。",
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
        <div><Link href={"/auth/reset-password"}>パスワードを忘れた方はこちら</Link></div>
      </form>
      <div>
        <p>
          初めてのご利用の方は<Link href={"/auth/register"}>こちら</Link>
        </p>
      </div>
      <div>
        <GoogleAuthButton text="ログインする" />
      </div>
    </>
  );
};

export default Login;
