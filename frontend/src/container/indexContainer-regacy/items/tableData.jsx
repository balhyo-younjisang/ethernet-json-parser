import styled from "styled-components";

export const TableData = (props) => {
  return (
    <tbody>
      <tr>
        <td>ElectroSmith</td>
        <td>197.0.0.0</td>
        <td>
          <label>
            <Checkbox role="switch" type="checkbox" />
          </label>
        </td>
        <td>7℃</td>
        <td>26.5℃(28℃)</td>
        <td>58.2%(60%)</td>
        <td>
          <label>
            <Checkbox role="switch" type="checkbox" />
          </label>
        </td>
        <td>
          <label>
            <Checkbox role="switch" type="checkbox" />
          </label>
        </td>
        <td>
          <ClassImg src="setting.svg" />
        </td>
      </tr>
    </tbody>
  );
};

const Checkbox = styled.input`
  appearance: none;
  position: relative;
  border: max(2px, 0.1em) solid gray;
  border-radius: 1.25em;
  width: 2.25em;
  height: 1.25em;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: gray;
    transition: left 250ms linear;
  }

  &:checked {
    background-color: tomato;
    border-color: tomato;
  }

  &:checked::before {
    background-color: white;
    left: 1em;
  }

  &:disabled {
    border-color: lightgray;
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:disabled:before {
    background-color: lightgray;
  }

  &:disabled + span {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid tomato;
  }

  &:enabled:hober {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }
`;

const ClassImg = styled.img`
  width: 20px;
  aspect-ratio: auto 20 / 20;
  height: 20px;
`;
