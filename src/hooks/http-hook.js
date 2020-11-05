import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
      message: null,
      type: "neutral"
  });

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      const abortController = new AbortController();
      activeHttpRequests.current.push(abortController);
      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers: headers,
          signal: abortController.signal
        });
        setIsLoading(false);

        const data = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter((controller) => {
            return controller !== abortController;
        })

        if (!response.ok) {
          throw new Error(data.message);
        }

        if(data.message){
            setResponseMessage({message: data.message, type: "success"});
        }
        
        return data;
      } catch (err) {
        
        setResponseMessage({message: err.message, type: "failure"});
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearResponseMessage = () => {
    setResponseMessage(null);
  };

  useEffect(() => {
    return () => {
        activeHttpRequests.current.forEach((abort) => {
            abort.abort();
        });
    }
  }, []);

  return {
    isLoading: isLoading,
    responseMessage: responseMessage,
    sendRequest: sendRequest,
    clearResponseMessage: clearResponseMessage
  };
};
