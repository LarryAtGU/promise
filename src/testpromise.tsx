import { useCallback, useEffect, useState } from "react";
const delayFun = (tm: number, result: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, tm);
  });
};

const getFirstName = async () => {
  const val = await delayFun(2000, "Larry");
  return val;
};

const getFamilyName = async () => {
  const val = await delayFun(3000, "Wen");
  return val;
};

const getNickName = async () => {
  const val = await delayFun(5000, "Blue Fish");
  return val;
};

const TestPromise = () => {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [nickName, setNickName] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [count]);

  const fetchFirstName = async () => {
    setCount(0);
    const val = await getFirstName();
    setFirstName(val);
  };

  const fetchFamilyName = async () => {
    setCount(0);

    const val = await getFamilyName();
    setFamilyName(val);
  };

  const fetchNickName = async () => {
    setCount(0);

    const val = await getNickName();
    setNickName(val);
  };

  const fetchAllName = () => {
    clearName();
    setCount(0);

    fetchFirstName();
    fetchFamilyName();
    fetchNickName();
  };

  const promiseAll = async () => {
    clearName();
    setCount(0);
    const fstNm = await getFirstName();

    setFirstName(fstNm);

    const fmlNm = await getFamilyName();
    setFamilyName(fmlNm);

    const nkNm = await getNickName();
    setNickName(nkNm);
  };

  const clearName = () => {
    setFirstName("");
    setFamilyName("");
    setNickName("");
  };
  return (
    <div>
      <h2>Test Promise Page</h2>
      <div>
        <h2>Get inforamtion:</h2>
        <div>
          <button onClick={fetchFirstName}>Get First Name</button>
          <button onClick={fetchFamilyName}>Get Family Name</button>
          <button onClick={fetchNickName}>Get Nick Name</button>
          <button onClick={clearName}>Clear Name</button>
        </div>
        <div>
          <button onClick={fetchAllName}>Get All Name</button>
          <button onClick={promiseAll}>Promise all</button>
        </div>
        <p>Timer: {count}</p>
        <p>First Name: {firstName}</p>
        <p>Family Name: {familyName}</p>
        <p>Nick Name: {nickName}</p>
      </div>
    </div>
  );
};

export default TestPromise;
