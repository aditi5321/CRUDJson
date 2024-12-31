import React from "react";
import Container from "./Container";

const Header = () => {
  return (
    <div className="border-b-[1px] border-b-gray-600 bg-white shadow-sm">
      <Container>
        <h1 className="text-base font-bold text-center">JSONPlaceholder</h1>
      </Container>
    </div>
  );
};

export default Header;
