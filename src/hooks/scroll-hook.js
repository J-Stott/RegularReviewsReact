import { useState, useEffect } from "react";

export const useScroll = (initialData, updateData, paramName) => {
  const [atBottom, setAtBottom] = useState(false);
  const [moreContentToLoad, setMoreContentToLoad] = useState(true);
  const [index, setIndex] = useState(0);
  const [loadingContent, setLoadingContent] = useState(false);

  const updateIndex = (prevIndex) => {
    return prevIndex + 1;
  }

  useEffect(() => {
    initialData(index);
    setIndex(updateIndex);
  }, [paramName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleScroll = async () => {
      if (moreContentToLoad && !loadingContent) {
        if (!atBottom) {
          if (
            window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight - 2
          ) {
            setAtBottom(true);
            setLoadingContent(true);
            const moreContent = await updateData(index);
            setIndex(updateIndex);
            setMoreContentToLoad(moreContent);
            setLoadingContent(false);
          }
        } else {
          if (
            window.innerHeight + window.pageYOffset <
            document.body.offsetHeight
          ) {
            setAtBottom(false);
          }
        }
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [paramName, atBottom, index, moreContentToLoad, loadingContent]); // eslint-disable-line react-hooks/exhaustive-deps

  return moreContentToLoad;
};
