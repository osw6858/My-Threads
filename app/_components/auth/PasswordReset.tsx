'use client';

const PasswordRest = () => {
  const resetPassword = () => {};

  return (
    <p
      className="text-lightFontColor dark:text-darkFontColor mt-3 cursor-pointer"
      onClick={resetPassword}
    >
      비밀번호를 잊으셨나요?
    </p>
  );
};

export default PasswordRest;
