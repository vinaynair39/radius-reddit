import React, { useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useGetItems from "utils/useGetItems";
import CardList from "components/CardList/CardList";
import Layout from "components/Layout/Layout";
// import "./SavedPage.scss";

interface Props {}
const SubredditPage: React.FC<Props> = () => {
  const [count, setCount] = useState(0);
  const {pathname} = useLocation()
  const { isLoading, items } = useGetItems(
    pathname,
    count,
    setCount
  );
  

  const observer = useRef<any>();
  const cardRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer.current) observer?.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
          setCount((count) => count + 6);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return (
    <Layout>
      <CardList items={items} loading={isLoading} cardRef={cardRef}/>
    </Layout>
  );
};
export default SubredditPage;
