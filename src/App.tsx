import CardList from "components/CardList/CardList";
import Layout from "components/Layout/Layout";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "store/store";
import useGetItems from "utils/useGetItems";


// check if all images were load

function App() {
  const { postType } = useSelector((state: AppState) => state.filter);
  const [count, setCount] = useState(0);
  const { isLoading, items } = useGetItems(
    postType.toLowerCase(),
    count,
    setCount
  );

  const observer = useRef<any>();
  const cardRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      console.log(observer.current)
      if (observer.current) observer?.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCount((count) => count + 6);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  console.log('items', items)
  return (
    <div className="App">
      <Layout>
        <CardList items={items} loading={isLoading} cardRef={cardRef} />
      </Layout>
    </div>
  );
}

export default App;
