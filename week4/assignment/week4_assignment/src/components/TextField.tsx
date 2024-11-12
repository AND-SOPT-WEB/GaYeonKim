// components/TextField.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';

interface TextFieldProps {
  label?: string; // 필드 상단에 표시할 레이블
  type?: 'text' | 'password';
  placeholder?: string;
  error?: boolean; // 에러 상태
  hint?: string; // 힌트 메시지
  showToggleIcon?: boolean; // 비밀번호 가시성 토글 아이콘
}

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 40rem;
  padding: 1rem;
  font-size: 1.4rem;
  border: 1px solid ${({ error, theme }) => (error ? theme.colors.error : theme.colors.gray)};
  border-radius: 0.5rem;
  outline: none;

  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary_400};
  }
`;

const ToggleIcon = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.4rem;
`;

const Hint = styled.p<{ error?: boolean }>`
  font-size: 1.2rem;
  color: ${({ error, theme }) => (error ? theme.colors.error : theme.colors.primary_400)};
  margin-top: 0.5rem;
`;

const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  placeholder,
  error = false,
  hint,
  showToggleIcon = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Container>
      <InputContainer>
        <Input
          type={type === 'password' && !isPasswordVisible ? 'password' : 'text'}
          placeholder={placeholder}
          error={error}
        />
        {showToggleIcon && type === 'password' && (
          <ToggleIcon onClick={handleToggleVisibility}>
            {isPasswordVisible ? '👁️' : '🙈'}
          </ToggleIcon>
        )}
      </InputContainer>
      {hint && <Hint error={error}>{hint}</Hint>}
    </Container>
  );
};

export default TextField;
