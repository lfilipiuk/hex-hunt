import { FC } from "react";

export const Logo: FC = () => {
  return (
    <div className={"flex items-center gap-1 select-none"}>
      <svg
        className={"text-gray-400"}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.875 2.4375C0.875 1.57456 1.57456 0.875 2.4375 0.875H6.8125C7.67545 0.875 8.375 1.57456 8.375 2.4375V13.375C8.375 15.4461 6.69607 17.125 4.625 17.125C2.55393 17.125 0.875 15.4461 0.875 13.375V2.4375ZM4.625 14.3125C5.14277 14.3125 5.5625 13.8928 5.5625 13.375C5.5625 12.8572 5.14277 12.4375 4.625 12.4375C4.10723 12.4375 3.6875 12.8572 3.6875 13.375C3.6875 13.8928 4.10723 14.3125 4.625 14.3125Z"
          fill="#9CA38F"
        />
        <path
          d="M7.9325 17.125H15.5626C16.4255 17.125 17.1251 16.4254 17.1251 15.5625V11.1875C17.1251 10.3246 16.4255 9.625 15.5626 9.625H15.4461L8.16058 16.9105C8.08626 16.9849 8.01019 17.0563 7.9325 17.125Z"
          fill="#9CA38F"
        />
        <path
          d="M9.61523 13.6879L15.0104 8.29267C15.6206 7.68248 15.6206 6.69315 15.0104 6.08296L11.9169 2.98937C11.3067 2.37917 10.3173 2.37917 9.70714 2.98937L9.62487 3.07165V13.375C9.62487 13.4801 9.62162 13.5844 9.61523 13.6879Z"
          fill="#9CA38F"
        />
      </svg>
      <h1 className={"font-semibold text-xl text-gray-400"}>hexhunter</h1>
    </div>
  );
};
