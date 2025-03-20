import { auth } from "@/lib/firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const NewPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [emailSendSuccess, setEmailSendSuccess] = useState<boolean>(false);

  const handleResetSendEmail = () => {
    const actionCodeSettings = {
      // パスワード再設定後にログイン画面にリダイレクトさせる
      url: 'http://localhost:3000/auth/login',
      handleCodeInApp: false,
    }

    sendPasswordResetEmail(auth, email, actionCodeSettings)
    .then(() => {
      setEmailSendSuccess(true);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <h1>パスワード再設定</h1>
      <div>
        <form>
          <label>メールアドレス</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleResetSendEmail();
            }}
          >
            送信する
          </button>
        </form>
        {emailSendSuccess && <p>パスワードリセットメールを送信しました。</p>}
      </div>
    </div>
  );
};

export default NewPassword;
