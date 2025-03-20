import React from "react";

const ErrorPage = () => {
  return (
    <div className="p-error">
      <div className="p-error__inner">
        <p className="p-error__title">500</p>
        <p className="p-error__text">
          お探しのページが見つかりませんでした。<br />
          ページが削除されたか、移動した可能性があります。
        </p>
      </div>
    </div>
  )
};

export default ErrorPage;
