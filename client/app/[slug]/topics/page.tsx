'use client'

import { Button, Card, Title, Pagination } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Page } from '@/components/Page'
import { Topic, fetchTopics } from '@/lib/store'
import classes from './page.module.css'
import useSession from '@/lib/useSession'

export default function GET() {
  const { session: { username } } = useSession()
  const [activePage, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [topics, setTopics] = useState<Topic[]>([])
  const [topicCount, setTopicCount] = useState<number>(0)

  useEffect(() => {
    (async function thunk() {
      const { total, items, per_page } = await fetchTopics(activePage, perPage)
      setTopicCount(total)
      setPerPage(per_page)
      setTopics(items.slice(0, per_page))
    }())
  }, [setTopicCount, setPerPage, setTopics, activePage, perPage])

  const fractionalPageCount = topicCount / perPage
  const integerPageCount = Math.floor(fractionalPageCount)
  const pageCount = fractionalPageCount > integerPageCount ? integerPageCount + 1 : integerPageCount

  return (
    <Page>
      <div className={classes.top}>
        <Title className={classes.title} order={2}>Topics</Title>

        <Button
          component="a"
          href={`/${username}/topics/new`}
          className={classes.addButton}
          >
            Add
        </Button>
      </div>

      <div className={classes.results}>
        {
          topics.map(({ id, name }) => (
            <Card
              key={id}
              component="a"
              href={`/${username}/topics/${id}`}
              padding="sm"
              radius="md"
              className={classes.card}>
              {name}
            </Card>
          ))
        }
      </div>

      <Pagination total={pageCount} value={activePage} onChange={setPage} my="sm" />
    </Page>
  )
}
