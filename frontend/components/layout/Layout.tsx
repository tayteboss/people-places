import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ReactNode } from "react";

const Main = styled.main``;

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Main>{children}</Main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
