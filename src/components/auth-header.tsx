"use client";

import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export default function AuthHeader() {
  return (
    <header aria-label="アカウント">
      <nav>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button type="button">ログイン</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button type="button">新規登録</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </nav>
    </header>
  );
}
