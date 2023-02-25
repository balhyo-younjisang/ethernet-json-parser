import styled from "styled-components";

export const Header = () => {
  return (
    <header>
      <div>
        <Form>
          <input type="text" placeholder="클라이언트의 수량을 입력해주세요" />
        </Form>
      </div>
    </header>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  text-align: center;

  & > input {
    width: 50vw;
    height: 5vh;
    font-size: larger;
    background-color: #c0c0c0;
    border: 0;
    border-radius: 4px;
    color: #878484;
    text-align: center;
  }

  & > input::placeholder {
    text-align: center;
  }
`;
