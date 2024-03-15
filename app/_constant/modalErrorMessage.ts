export const SIGN_IN_ERROR_MESSAGE = [
  {
    modalId: 'empty_input',
    content: '비밀번호와 이메일을 모두 입력해 주세요.',
  },
  {
    modalId: 'incorrect_error_modal',
    content: '이메일과 비밀번호를 다시 확인해 주세요.',
  },
  {
    modalId: 'sign_in_error_modal',
    content: '로그인중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.',
  },
];

export const SIGN_UP_ERROR_MESSAGE = [
  {
    modalId: 'missing_info_error_modal',
    content: '모든 항목을 입력해 주세요.',
  },
  {
    modalId: 'sign-up-error-modal',
    content: '회원가입중 문제가 발생했습니다. 잠시후 다시 시도해 주세요.',
  },
  {
    modalId: 'missmatch-password',
    content: '비밀번호 두개가 일치하지 않습니다.',
  },
  {
    modalId: 'password-lenght-error',
    content: '비밀번호는 최소 6자리 입니다.',
  },
  {
    modalId: 'duplicate-nickname',
    content: '이미 존재하는 닉네임 입니다.',
  },
];

export const SUPABASE_ERROR_MESSAGE = {
  duplicateNickname:
    'duplicate key value violates unique constraint "users_user_name_key"',
};
