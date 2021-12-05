import React from 'react'
import { useInfiniteQuery } from 'react-query'
import Person from './Person'


const fetchPeople = async ({ pageParam = 1 }) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${pageParam}`)
  return await res.json()
}

const People = () => {
  // https://react-query.tanstack.com/guides/infinite-queries
  // 实现无限查询
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("people", fetchPeople, {
    getNextPageParam(lastPage, pages) {
      // console.log(lastPage, pages)
      // next是服务端返回的字段 'https://swapi.dev/api/planets/?page=2'
      if (lastPage.next) {
        return lastPage.next[lastPage.next.length - 1]
      }
    },
    getPreviousPageParam: (firstPage, pages) => {
      if (firstPage.previous) {
        return firstPage.previous[firstPage.previous.length - 1]
      }
    },
  })
  return (
    <div>
      <h2>人物</h2>
      {status === 'loading' && (
        <div>加载数据...</div>
      )}
      {status === 'error' && (
        <div>请求数据错误: {error.message}</div>
      )}
      {status === 'success' && (
        <div>
          {/* {console.log(data)} */}
          {data.pages.map(page => page.results.map(person => <Person key={person.name} person={person} />))}
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? '加载更多中...'
                : hasNextPage
                  ? '加载更多'
                  : '抱歉，没有更多可以加载'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </div>
      )}
    </div>
  )
}

export default People
