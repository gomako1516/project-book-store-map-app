import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { auth, db } from "@/lib/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user; // ユーザー情報を取得
        setDoc(doc(db, "users", user.uid), {
          username: data.username,
          email: data.email, // Firestoreにユーザー情報を保存
        });
        router.push("/auth/login"); // ログインページへ遷移
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("既に登録されているメールアドレスです。");
        } else {
          alert(error.message);
        }
      });

    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>新規登録</h1>
        <div>
          <label>ユーザー名</label>
          <input
            type="text"
            {...register("username", {
              required: "ユーザー名を入力してください",
            })}
          />
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
          <button type="submit">登録する</button>
        </div>
      </form>
      <div>
        <p>
          アカウントをお持ちの方は<Link href={"/auth/login"}>こちら</Link>
        </p>
      </div>
      <div>
        <GoogleAuthButton text="登録する" />
      </div>
    </div>
  );
};

export default Register;
