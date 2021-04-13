import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "store/common/reducer";
import { AppState } from "store/store";

const useGetItems = (query: string, count: number, setCount: any) => {
  const [items, setItems] = useState<any>([]);
  const {isLoading, posts} = useSelector((state: AppState) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    axios
      .get(
        `${process.env.REACT_APP_API}/${query}.json?limit=${
          count + 5
        }&sr_detail=true`
      )
      .then(({ data }: { data: any }) => {
        const newPosts = [...items, ...data?.data?.children.slice(count)]
        setItems(newPosts);
        dispatch(setPosts(newPosts))
        dispatch(setLoading(false));
      });
  }, [count]);

  useEffect(() => {
    dispatch(setPosts([]))
    dispatch(setLoading(true));
    axios
      .get(
        `${process.env.REACT_APP_API}/${query}.json?limit=6&count=${count}&sr_detail=true`
      )
      .then(({ data }: { data: any }) => {
        setItems(data?.data?.children);
        dispatch(setPosts(data?.data?.children))
        dispatch(setLoading(false));
      });
  }, [query]);

  return {
    isLoading,
    items: posts,
  };
};
export default useGetItems;
