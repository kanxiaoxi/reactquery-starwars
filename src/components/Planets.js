import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Planet from './Planet'

// const fetchPlanets = async ({ queryKey }) => {
//   console.log(queryKey[1])
//   const res = await fetch(`http://swapi.dev/api/planets/?page=${queryKey[1]}`)
//   return await res.json()
// }

const fetchPlanets = async (pageParam) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${pageParam}`)
  return await res.json()
}

const Planets = () => {
  const [page, setPage] = useState(1)
  // const { data, status } = useQuery(["planets", page], fetchPlanets, {
  //   staleTime: 0,
  //   // cacheTime: 0,
  //   onSuccess: () => console.log('数据获取成功')
  // })

  // https://react-query.tanstack.com/guides/migrating-to-react-query-3#usepaginatedquery-has-been-deprecated-in-favor-of-the-keeppreviousdata-option

  // 实现分页查询
  const {
    data,
    status,
    error,
    isFetching
  } = useQuery(["planets", page], () => fetchPlanets(page), {
    keepPreviousData: true,
  })



  return (
    <div>
      <h2>星球</h2>
      <p>{status}</p>
      {status === 'loading' && (
        <div>加载数据...</div>
      )}
      {status === 'error' && (
        <div>请求数据错误: {error.message}</div>
      )}
      {status === 'success' && (

        <>
          {console.log('data', data)}
          {/* 使用isFetching避免在加载数据时点击操作 */}
          <button disabled={page === 1 || isFetching} onClick={() => setPage(pre => Math.max(pre - 1, 1))}>上一页</button>
          <span>{page}</span>
          <button disabled={!data || !data.next || isFetching} onClick={() => setPage(pre => (!data || !data.next ? pre : pre + 1))}>下一页</button>

          <div>
            {data.results.map(planet => <Planet key={planet.name} planet={planet} />)}
          </div>
        </>
      )
      }
    </div >
  )
}

export default Planets

