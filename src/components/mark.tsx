import React from "react";

// 'xxx关键字xxx关键字xxx'
//split后['xxx','xxx','xxx']
//可以发现是中间被split掉了,所以除了最后一个,其他的在后面加上有颜色的关键字就好了
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  } else {
    const arr = name.split(keyword);
    return (
      <>
        {arr.map((str, index) => (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "#257AFD" }}>{keyword}</span>
            )}
          </span>
        ))}
      </>
    );
  }
};
