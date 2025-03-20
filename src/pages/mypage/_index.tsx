import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import 'semantic-ui-css/semantic.min.css'
import { Loader } from "semantic-ui-react";

const Mypage = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  const css = {
    height: "100vh",
    display: "grid",
    placeContent: "center",
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  },[router])

  if(!user) return <div style={css}><Loader active size="huge" inline="centered" /></div>;

  return <div>Mypage</div>;
};

export default Mypage;
